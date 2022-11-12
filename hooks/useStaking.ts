import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

export type Category = 'toxic' | 'toxicSpecial' | 'foolkatz' | 'succubus';

type StakingState = {
  pageNo: number;
  nfts: any[];
  totalCount: number;
};

const BASE_URL = 'https://eth-goerli.g.alchemy.com/nft/v2';
const OWNER_ADDRESS = '0x5fD271a9bc50f1E210f15318C6B15d8bB79Cf67d';
const API_KEY = '7FCTRHjK9c73oJcP5HXEcif9V8WahYyo';

const contractQuery =
  'contractAddresses[]=0xd618b5A9ab5D39bDD88e600958647fD9Bd246f4D&contractAddresses[]=0xcd6e8104f7c0fed8A9c50560106B1319b4B52cFb&contractAddresses[]=0x185780AD37a6018b660cAe29Ec83581a67ea28b7';

function reducer(state: StakingState, action: any): StakingState {
  switch (action.type) {
    case 'GET_NFTS':
      return {
        ...state,
        nfts: action.payload,
        totalCount: action.totalCount,
      };

    case 'CHANGE_PAGE':
      return { ...state, pageNo: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function useStaking(getUrl: string = '/staking/nft/mine') {
  const [state, dispatch] = useReducer(reducer, {
    pageNo: 1,
    nfts: [],
    totalCount: 0,
  });

  const getNfts = useCallback(async () => {
    const { ownedNfts, totalCount } = await fetch(
      `${BASE_URL}/${API_KEY}/getNFTs?owner=${OWNER_ADDRESS}&
    `,
      {
        method: 'GET',
      },
    ).then(res => res.json());

    dispatch({
      type: 'GET_NFTS',
      totalCount,
      payload: ownedNfts,
    });
  }, [state.pageNo, getUrl]);

  const onSelect = (id: number) => {
    dispatch({
      type: 'SELECT',
      payload: id,
    });
  };

  const onSelectAll = () => {
    dispatch({ type: 'SELECT_ALL' });
  };

  const onUnSelectAll = () => {
    dispatch({ type: 'UNSELECT_ALL' });
  };

  const onStaking = async (id: number) => {
    // try {
    //   await api({
    //     method: 'post',
    //     url: '/staking/stak',
    //     data: {
    //       contract_address: '',
    //       token_id: state.nfts.map((id) => String(id)),
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    onUnSelectAll();
  };

  const onUnStaking = async () => {
    try {
      // await api({
      //   method: 'post',
      //   url: '/staking/unstak',
      //   data: {
      //     contract_address:'',
      //     token_id: state.nfts.map((id) => String(id)),
      //   },
      // });

      onUnSelectAll();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePage = useCallback((page: number) => {
    dispatch({ type: 'CHANGE_PAGE', payload: page });
  }, []);

  useEffect(() => {
    getNfts();
  }, [getNfts]);

  return {
    state,
    getNfts,
    onSelect,
    onSelectAll,
    onUnSelectAll,
    onStaking,
    onUnStaking,
    onChangePage,
  };
}
