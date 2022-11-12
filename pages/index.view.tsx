import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Group from '../components/Group';
import Info from '../components/Info';
import Single from '../components/Single';
import { StackingPageProps } from './index.types';
import { MainContainer, TabModal } from './index.styles';
import { Alchemy, Network } from 'alchemy-sdk';
import Web3 from 'web3';

import useAccount from '../hooks/useAccount';
import useWeb3 from '../hooks/useWeb3';
import useStaking from '../hooks/useStaking';

// const alchemy = new Alchemy(settings);

// const web3 = new Web3(window.ethereum);

const StackingPage: NextPage<StackingPageProps> = ({
  tab,
  tabClick,
  onChangeTab,
  onClickTabChoice,
}): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const { account } = useAccount();
  const [web3, smartContract] = useWeb3();
  const { state } = useStaking();

  const onStaking = useCallback(
    async (id: number) => {
      await smartContract.methods
        .stake(id, '0x5fD271a9bc50f1E210f15318C6B15d8bB79Cf67d')
        .call();
    },
    [smartContract, account],
  );

  useEffect(() => {
    if (!smartContract || !account) return;

    (async () => {
      const options = {
        method: 'GET',
        headers: { accept: 'application/json' },
      };

      console.log(
        'totalStaked:',
        await smartContract.methods.getStakedTokenList(account).call(),
      );
    })();
  }, [smartContract, account]);

  return (
    <MainContainer>
      <img className="crystal-img" src="/images/crystal.png" alt="crystal" />
      <div className="top-title">
        <h1>
          Staking <span>{tab}</span>
        </h1>
        <div className="arrow-inner">
          <img src="/images/arrow-down.png" onClick={onChangeTab} />
          {tabClick && (
            <TabModal>
              <div className="tab-inner">
                {['NFTs', 'ORT'].map(item => (
                  <p
                    className={item === tab ? 'color' : ''}
                    onClick={() => onClickTabChoice(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </TabModal>
          )}
        </div>
      </div>
      <Info totalCount={state.totalCount} />
      <Single data={state.nfts} onStaking={onStaking} />
      <Group />
    </MainContainer>
  );
};

export default StackingPage;
