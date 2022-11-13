import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Group from '../components/Group';
import Info from '../components/Info';
import Single from '../components/Single';
import { StackingPageProps } from './index.types';
import { MainContainer, TabModal } from './index.styles';
import Web3 from 'web3';

import useAccount from '../hooks/useAccount';
import useWeb3 from '../hooks/useWeb3';
import useStaking from '../hooks/useStaking';
import AddNft from '../components/AddNft';
import SelectNft from '../components/SelectNft';

const StackingPage: NextPage<StackingPageProps> = ({
  tab,
  tabClick,
  onChangeTab,
  onClickTabChoice,
}): JSX.Element => {
  const [addModal, setAddModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const {
    state,
    onStaking,
    onUnStaking,
    onSelectGroup,
    onGroupStaking,
    onGroupUnStaking,
  } = useStaking();

  const onSelect = useCallback(
    (tokenId: number) => {
      activeGroupId !== null && onSelectGroup(tokenId, activeGroupId);
    },
    [activeGroupId],
  );

  console.log('state:', state);

  const totalORT = useMemo(() => {
    return state.stakingNfts
      .reduce((acc, cv) => (acc += +cv.reward), 0)
      .toFixed(5);
  }, [state.stakingNfts]);

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
      <Info
        totalCount={state.totalCount}
        stakingNfts={state.stakingNfts.length}
        totalORT={totalORT}
      />
      <Single
        data={state.stakingNfts}
        onClick={() => setAddModal(true)}
        onUnStaking={onUnStaking}
      />
      <Group
        groupNfts={state.groupNfts}
        onClick={(id: number) => {
          setGroupModal(true);
          setActiveGroupId(id);
        }}
        onGroupStaking={onGroupStaking}
        onGroupUnStaking={onGroupUnStaking}
      />
      {addModal && (
        <AddNft
          nfts={state.stakableNfts}
          onClose={() => setAddModal(false)}
          onStaking={onStaking}
        />
      )}
      {groupModal && (
        <SelectNft
          nfts={state.stakableNfts.filter(nft =>
            state.groupNfts.every(
              groupNft => groupNft?.tokenId !== nft.tokenId,
            ),
          )}
          onClose={() => setGroupModal(false)}
          onSelect={onSelect}
        />
      )}
    </MainContainer>
  );
};

export default StackingPage;
