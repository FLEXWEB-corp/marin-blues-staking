import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import useAccount from './useAccount';
import useWeb3 from './useWeb3';

export type Category = 'toxic' | 'toxicSpecial' | 'foolkatz' | 'succubus';

type StakingState = {
  nfts: any[];
  totalCount: number;
  groupNfts: any[];
  groupUnStakingNfts: any[];
  stakingNfts: any[];
  stakableNfts: any[];
};

const BASE_URL = 'https://eth-goerli.g.alchemy.com/nft/v2';
const nftContract = '0x185780AD37a6018b660cAe29Ec83581a67ea28b7';
const OWNER_ADDRESS = '0x5fD271a9bc50f1E210f15318C6B15d8bB79Cf67d';
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
        totalCount: action.totalCount,
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
    case 'GROUP_UN_SELECT':
      return {
        ...state,
        groupUnStakingNfts: state.groupUnStakingNfts.map((nft, idx) =>
          idx === action.payload.groupId
            ? state.stakingNfts.find(
                el => el.tokenId === action.payload.tokenId,
              )
            : nft,
        ),
      };
    case 'STAKE':
      return {
        ...state,
        stakingNfts: state.stakingNfts.concat(action.payload.stakingNft),
        stakableNfts: state.stakableNfts.filter(
          nft => nft.tokenId !== action.payload.tokenId,
        ),
      };
    case 'UNSTAKE':
      return {
        ...state,
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
        stakingNfts: state.stakingNfts.concat(action.payload.stakingNfts),
        stakableNfts: state.stakableNfts.filter(
          nft => !state.groupNfts.some(gNft => nft.tokenId === gNft?.tokenId),
        ),
        groupNfts: Array(5).fill(null),
      };
    case 'GROUP_UNSTAKE':
      return {
        ...state,
        stakingNfts: state.stakingNfts.filter(
          nft =>
            !state.groupUnStakingNfts.some(
              gNft => nft.tokenId === gNft?.tokenId,
            ),
        ),
        stakableNfts: state.stakableNfts.concat(
          state.groupUnStakingNfts.filter(el => el),
        ),
        groupUnStakingNfts: Array(5).fill(null),
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function useStaking() {
  const [web3, smartContract] = useWeb3();
  const { account } = useAccount();

  const [state, dispatch] = useReducer(reducer, {
    nfts: [],
    totalCount: 0,
    groupNfts: Array(5).fill(null),
    groupUnStakingNfts: Array(5).fill(null),
    stakingNfts: [],
    stakableNfts: [],
  });

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
      `${BASE_URL}/${API_KEY}/getNFTs?owner=${OWNER_ADDRESS}&${contractQuery}
    `,
      {
        method: 'GET',
      },
    ).then(res => res.json());

    const stakedList = await smartContract.methods
      .getStakedTokenList(account)
      .call();

    const { stakingNfts, stakableNfts } = ownedNfts.reduce(
      (acc: any, cv: any) => {
        const tokenId = parseInt(cv.id.tokenId, 16);

        const stakedItem = stakedList.find(
          (el: any) => +el.tokenId === tokenId,
        );

        if (stakedItem) {
          acc.stakingNfts.push({
            ...cv,
            tokenId,
            stakingAt: stakedItem.timestamp,
          });
        } else {
          acc.stakableNfts.push({ ...cv, tokenId });
        }

        return acc;
      },
      {
        stakingNfts: [],
        stakableNfts: [],
      },
    );

    const stakingNftsResult = await Promise.all(
      stakingNfts.map(async (nft: any) => ({
        ...nft,
        reward: await addReward(nft),
      })),
    );

    dispatch({
      type: 'GET_NFTS',
      totalCount,
      payload: { ownedNfts, stakingNfts: stakingNftsResult, stakableNfts },
    });
  }, [smartContract, account]);

  const setStakeNfts = (stakingNfts: any[], stakableNfts: any[]) => {
    dispatch({
      type: 'SET_STAKE_NFTS',
      payload: {
        stakingNfts,
        stakableNfts,
      },
    });
  };

  const onSelectGroup = (tokenId: number, groupId: number) => {
    dispatch({
      type: 'GROUP_SELECT',
      payload: { tokenId, groupId },
    });
  };
  const onSelectUnGroup = (tokenId: number, groupId: number) => {
    dispatch({
      type: 'GROUP_UN_SELECT',
      payload: { tokenId, groupId },
    });
  };

  const onStaking = useCallback(
    async (id: number) => {
      try {
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
      }
    },
    [smartContract, account, state.stakableNfts],
  );

  const onUnStaking = useCallback(
    async (tokenId: number) => {
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

    const result = await smartContract.methods.groupStake(stakeList).send({
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
  }, [smartContract, state.groupNfts, account]);

  const onGroupUnStaking = useCallback(async () => {
    const unstakeList = state.groupUnStakingNfts.reduce((acc, cv) => {
      if (cv) {
        acc.push([account, cv.tokenId, nftContract, 0, false]);
      }

      return acc;
    }, []);

    await smartContract.methods.groupUnstake(unstakeList).send({
      from: account,
      to: '0x6EF90Cd81185aa41752288271F7f97F2BD0bb7f4',
      gasLimit: 500000 * unstakeList.length,
    });

    dispatch({
      type: 'GROUP_UNSTAKE',
    });
  }, [smartContract, state.groupNfts, account]);

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
    onSelectGroup,
    onSelectUnGroup,
    setStakeNfts,
  };
}
