import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import useAccount from './useAccount';
import useWeb3 from './useWeb3';

export type Category = 'toxic' | 'toxicSpecial' | 'foolkatz' | 'succubus';

type StakingState = {
  nfts: any[];
  totalCount: number;
  groupNfts: any[];
  groupStakingNfts: any[];
  stakingNfts: any[];
  stakableNfts: any[];
  loading: boolean;
  loadingText: string;
  error: boolean;
  success: boolean;
};

const BASE_URL = 'https://eth-goerli.g.alchemy.com/nft/v2';
// const BASE_URL = 'https://eth-mainnet.g.alchemy.com/nft/v2';
const nftContract = '0x185780AD37a6018b660cAe29Ec83581a67ea28b7';
const API_KEY = '7FCTRHjK9c73oJcP5HXEcif9V8WahYyo';

const contractQuery =
  'contractAddresses[]=0xd618b5A9ab5D39bDD88e600958647fD9Bd246f4D&contractAddresses[]=0xcd6e8104f7c0fed8A9c50560106B1319b4B52cFb&contractAddresses[]=0x185780AD37a6018b660cAe29Ec83581a67ea28b7';

function reducer(state: StakingState, action: any): StakingState {
  switch (action.type) {
    case 'GET_NFTS':
      return {
        ...state,
        nfts: action.payload.ownedNfts,
        stakingNfts: action.payload.stakingNfts,
        stakableNfts: action.payload.stakableNfts,
        groupStakingNfts: action.payload.groupStakingNfts,
        totalCount: action.totalCount,
      };
    case 'LOADING':
      return { ...state, loading: true, loadingText: action.payload };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: true,
        loadingText: action.payload,
      };
    case 'CLOSE_ERROR':
      return {
        ...state,
        error: false,
      };
    case 'CLOSE_SUCCESS':
      return {
        ...state,
        success: false,
      };
    case 'TOGGLE_NFT':
      return {
        ...state,
        stakableNfts: state.stakableNfts.map(nft =>
          nft.tokenId === action.payload
            ? { ...nft, checked: !nft.checked }
            : nft,
        ),
      };
    case 'UN_CHECK_ALL':
      return {
        ...state,
        stakableNfts: state.stakableNfts.map(nft => ({
          ...nft,
          checked: false,
        })),
      };
    case 'GROUP_SELECT':
      return {
        ...state,
        groupNfts: state.groupNfts.map((nft, idx) =>
          idx === action.payload.groupId
            ? state.stakableNfts.find(
                el => el.tokenId === action.payload.tokenId,
              )
            : nft,
        ),
      };
    case 'UN_SELECT':
      return {
        ...state,
        groupNfts: state.groupNfts.map(el =>
          el?.tokenId === action.payload ? null : el,
        ),
      };
    case 'STAKE':
      return {
        ...state,
        loading: false,
        stakingNfts: state.stakingNfts.concat(action.payload.stakingNft),
        stakableNfts: state.stakableNfts.filter(
          nft => nft.tokenId !== action.payload.tokenId,
        ),
      };
    case 'UNSTAKE':
      return {
        ...state,
        loading: false,
        success: true,
        stakingNfts: state.stakingNfts.filter(
          nft => nft.tokenId !== action.payload,
        ),
        stakableNfts: state.stakableNfts.concat({
          ...state.nfts.find(
            nft => parseInt(nft.id.tokenId, 16) === action.payload,
          ),
          tokenId: action.payload,
        }),
      };
    case 'GROUP_STAKE':
      return {
        ...state,
        loading: false,
        groupStakingNfts: state.groupStakingNfts.concat(
          action.payload.stakingNfts,
        ),
        stakableNfts: state.stakableNfts.filter(
          nft => !state.groupNfts.some(gNft => nft.tokenId === gNft?.tokenId),
        ),
        groupNfts: Array(5).fill(null),
      };
    case 'GROUP_UNSTAKE':
      return {
        ...state,
        loading: false,
        stakingNfts: state.stakingNfts.filter(
          nft =>
            !state.groupStakingNfts.some(gNft => nft.tokenId === gNft?.tokenId),
        ),
        groupStakingNfts: state.groupStakingNfts.filter(
          (_, idx) => idx !== action.payload,
        ),
        stakableNfts: state.stakableNfts.concat(
          state.groupStakingNfts.filter(el => el),
        ),
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState = {
  nfts: [],
  totalCount: 0,
  groupNfts: Array(5).fill(null),
  groupStakingNfts: [],
  stakingNfts: [],
  stakableNfts: [],
  loading: false,
  loadingText: '',
  error: false,
  success: false,
};

export default function useStaking() {
  const [web3, smartContract] = useWeb3();
  const { account } = useAccount();
  // const account = '0x112f7E9307736149540954EFDCd4A0B60881496d';

  const [state, dispatch] = useReducer(reducer, initialState);

  const addReward = useCallback(
    async (stakingNft: any) => {
      const reward = await web3.utils.fromWei(
        web3.utils.toBN(
          await smartContract.methods
            .getReward(
              stakingNft.stakingAt,
              stakingNft.tokenId,
              '0x185780AD37a6018b660cAe29Ec83581a67ea28b7',
              false,
            )
            .call(),
        ),
        'ether',
      );

      return reward;
    },
    [web3, smartContract],
  );

  const getNfts = useCallback(async () => {
    if (!smartContract || !account) return;

    const { ownedNfts, totalCount } = await fetch(
      `${BASE_URL}/${API_KEY}/getNFTs?owner=${account}&${contractQuery}
    `,
      {
        method: 'GET',
      },
    ).then(res => res.json());

    const stakedList = await smartContract.methods
      .getStakedTokenList(account)
      .call();

    console.log(stakedList);

    const { stakingNfts, stakableNfts, groupStakingNfts } = ownedNfts.reduce(
      (acc: any, cv: any) => {
        const tokenId = parseInt(cv.id.tokenId, 16);

        const stakedItem = stakedList.find(
          (el: any) => +el.tokenId === tokenId,
        );

        if (stakedItem?.isGroup) {
          acc.groupStakingNfts.push({
            ...cv,
            tokenId,
            stakingAt: stakedItem.timestamp,
            isGroup: stakedItem?.isGroup,
          });
        } else if (stakedItem) {
          acc.stakingNfts.push({
            ...cv,
            tokenId,
            stakingAt: stakedItem.timestamp,
            isGroup: stakedItem?.isGroup,
          });
        } else {
          acc.stakableNfts.push({
            ...cv,
            tokenId,
            checked: false,
            isGroup: stakedItem?.isGroup,
          });
        }

        return acc;
      },
      {
        stakingNfts: [],
        stakableNfts: [],
        groupStakingNfts: [],
      },
    );

    const stakingNftsResult = await Promise.all(
      stakingNfts.map(async (nft: any) => ({
        ...nft,
        reward: await addReward(nft),
      })),
    );

    const groupStakingNftsResult = await Promise.all(
      groupStakingNfts.map(async (nft: any) => ({
        ...nft,
        reward: await addReward(nft),
      })),
    );

    dispatch({
      type: 'GET_NFTS',
      totalCount,
      payload: {
        ownedNfts,
        stakingNfts: stakingNftsResult,
        stakableNfts,
        groupStakingNfts: groupStakingNftsResult.length
          ? [groupStakingNftsResult]
          : [],
      },
    });
  }, [smartContract, account]);

  const closeError = useCallback(() => {
    dispatch({
      type: 'CLOSE_ERROR',
    });
  }, []);
  const closeSuccess = useCallback(() => {
    dispatch({
      type: 'CLOSE_SUCCESS',
    });
  }, []);

  const onToggle = useCallback((id: number) => {
    dispatch({
      type: 'TOGGLE_NFT',
      payload: id,
    });
  }, []);

  const unCheckAll = useCallback(() => {
    dispatch({
      type: 'UN_CHECK_ALL',
    });
  }, []);

  const onSelectGroup = (tokenId: number, groupId: number) => {
    dispatch({
      type: 'GROUP_SELECT',
      payload: { tokenId, groupId },
    });
  };
  // const onSelectUnGroup = (tokenId: number, groupId: number) => {
  //   dispatch({
  //     type: 'GROUP_UN_SELECT',
  //     payload: { tokenId, groupId },
  //   });
  // };

  const unSelect = (tokenId: number) => {
    dispatch({
      type: 'UN_SELECT',
      payload: tokenId,
    });
  };

  const onStaking = useCallback(
    async (id: number) => {
      try {
        dispatch({
          type: 'LOADING',
          payload: 'Single Parking',
        });

        await smartContract.methods.stake(id, nftContract).send({
          from: account,
          to: '0x6EF90Cd81185aa41752288271F7f97F2BD0bb7f4',
          gasLimit: 500000,
        });

        const stakedList = await smartContract.methods
          .getStakedTokenList(account)
          .call();

        const stakedItem = stakedList.find((el: any) => +el.tokenId === id);

        dispatch({
          type: 'STAKE',
          payload: {
            stakingNft: {
              ...state.stakableNfts.find(nft => nft.tokenId === id),
              stakingAt: stakedItem.timestamp,
              reward: await addReward({
                ...state.stakableNfts.find(nft => nft.tokenId === id),
                stakingAt: stakedItem.timestamp,
              }),
            },
            tokenId: id,
          },
        });
      } catch (error) {
        console.log(error);

        dispatch({
          type: 'ERROR',
          payload: 'Oops.. 💔',
        });
      }
    },
    [smartContract, account, state.stakableNfts],
  );

  const onUnStaking = useCallback(
    async (tokenId: number) => {
      dispatch({
        type: 'LOADING',
        payload: 'Claiming ORT',
      });

      try {
        await smartContract.methods.unstake(tokenId, nftContract).send({
          from: account,
          to: '0x6EF90Cd81185aa41752288271F7f97F2BD0bb7f4',
          gasLimit: 500000,
        });

        dispatch({
          type: 'UNSTAKE',
          payload: tokenId,
        });
      } catch (error) {
        console.log(error);

        dispatch({
          type: 'ERROR',
          payload: 'Oops.. 💔',
        });
      }
    },
    [smartContract, account],
  );

  const onGroupStaking = useCallback(async () => {
    const stakeList = state.groupNfts.reduce((acc, cv) => {
      if (cv) {
        acc.push([account, cv.tokenId, nftContract, 0, false]);
      }

      return acc;
    }, []);

    dispatch({
      type: 'LOADING',
      payload: '그룹 스테이킹이 진행중입니다.\n창을 닫지마세요.',
    });

    try {
      await smartContract.methods.groupStake(stakeList).send({
        from: account,
        to: '0x6EF90Cd81185aa41752288271F7f97F2BD0bb7f4',
        gasLimit: 500000 * stakeList.length,
      });

      const stakedList = await smartContract.methods
        .getStakedTokenList(account)
        .call();

      const addItems = state.groupNfts.reduce((acc, cv) => {
        if (cv) {
          const stakedItem = stakedList.find(
            (el: any) => +el.tokenId === cv.tokenId,
          );

          acc.push({ ...cv, stakingAt: stakedItem.timestamp, reward: 0 });
        }

        return acc;
      }, []);

      dispatch({
        type: 'GROUP_STAKE',
        payload: {
          stakingNfts: addItems,
        },
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: 'Oops.. 💔',
      });
    }
  }, [smartContract, state.groupNfts, account]);

  const onGroupUnStaking = useCallback(
    async (idx: number) => {
      dispatch({
        type: 'LOADING',
        payload: '그룹언스테이킹중입니다.\n창을 닫지마세요.',
      });

      try {
        if (!state.groupStakingNfts[idx]) return;
        const unstakeList = state.groupStakingNfts[idx].reduce(
          (acc: any, cv: any) => {
            if (cv) {
              acc.push([account, cv.tokenId, nftContract, 0, false]);
            }

            return acc;
          },
          [],
        );

        await smartContract.methods.groupUnstake(unstakeList).send({
          from: account,
          to: '0x6EF90Cd81185aa41752288271F7f97F2BD0bb7f4',
          gasLimit: 500000 * unstakeList.length,
        });

        dispatch({
          type: 'GROUP_UNSTAKE',
          payload: idx,
        });
      } catch (error) {
        console.log('error:', error);

        dispatch({
          type: 'ERROR',
          payload: 'Oops.. 💔',
        });
      }
    },
    [smartContract, state, account, dispatch],
  );

  useEffect(() => {
    getNfts();
  }, [getNfts]);

  return {
    state,
    getNfts,
    onStaking,
    onUnStaking,
    onGroupStaking,
    onGroupUnStaking,
    onToggle,
    onSelectGroup,
    closeError,
    closeSuccess,
    unSelect,
    unCheckAll,
  };
}
