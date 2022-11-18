import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import Group from '../components/Group';
import Info from '../components/Info';
import Single from '../components/Single';
import useStaking from '../hooks/useStaking';
import AddNft from '../components/AddNft';
import SelectNft from '../components/SelectNft';
import Modal from '../components/Modal';
import styled from 'styled-components';

const StackingPage: NextPage<{
  tab: string;
  tabClick: boolean;
  onChangeTab: () => void;
  onClickTabChoice: (item: string) => void;
}> = ({ tab, tabClick, onChangeTab, onClickTabChoice }): JSX.Element => {
  const [addModal, setAddModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [groupUnModal, setGroupUnModal] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const {
    state,
    onStaking,
    onUnStaking,
    onSelectGroup,
    onSelectUnGroup,
    onGroupStaking,
    onGroupUnStaking,
  } = useStaking();

  const onSelect = useCallback(
    (tokenId: number) => {
      activeGroupId !== null && onSelectGroup(tokenId, activeGroupId);
    },
    [activeGroupId],
  );
  const onSelectUn = useCallback(
    (tokenId: number) => {
      activeGroupId !== null && onSelectUnGroup(tokenId, activeGroupId);
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
          <span>
            <strong>{tab}</strong>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.655 16.321 20 20.976l-4.655-4.655a1.667 1.667 0 1 0-2.357 2.358l5.833 5.833c.651.65 1.707.65 2.358 0l5.833-5.833a1.667 1.667 0 1 0-2.357-2.358z"
                fill="#141416"
                fill-rule="evenodd"
              />
            </svg>

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
          </span>
          <p>Parking Lot</p>
        </h1>
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
        title={'Group Staking'}
        type="staking"
        groupNfts={state.groupNfts}
        onClick={(id: number) => {
          setGroupModal(true);
          setActiveGroupId(id);
        }}
        onGroupStaking={onGroupStaking}
        onGroupUnStaking={onGroupUnStaking}
      />
      <Group
        title={'Group UnStaking'}
        type="unstaking"
        groupNfts={state.groupUnStakingNfts}
        onClick={(id: number) => {
          setGroupUnModal(true);
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
      {groupUnModal && (
        <SelectNft
          nfts={state.stakingNfts.filter(nft =>
            state.groupUnStakingNfts.every(
              groupNft => groupNft?.tokenId !== nft.tokenId,
            ),
          )}
          onClose={() => setGroupUnModal(false)}
          onSelect={onSelectUn}
        />
      )}
      {(state.loading || state.error) && (
        <Modal onClose={() => {}}>
          <h2
            style={{
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
          >
            {state.loadingText}
          </h2>
          <svg
            style={{
              width: '100px',
              height: '100px',
              display: 'block',
              margin: '0 auto',
            }}
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
          >
            <path
              fill="#00c389"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              ></animateTransform>
            </path>
          </svg>
        </Modal>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  max-width: 1440px;
  padding: 0 160px;
  margin: 0 auto;

  .crystal-img {
    position: absolute;
    top: 0;
    right: 0;
    object-fit: contain;
    z-index: -1;
  }

  .top-title {
    h1 {
      font-size: 40px;
      font-weight: 600;
      color: #23262f;
      margin-bottom: 64px;

      span {
        strong {
          color: #5e4fff;
        }
        &:first-child {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;

const TabModal = styled.div`
  position: absolute;
  left: 40px;
  top: -5px;
  width: 176px;
  height: 128px;
  border-radius: 16px;
  box-shadow: 0 16px 24px 0 rgba(15, 15, 15, 0.2);
  background: #fff;
  z-index: 100;

  .tab-inner {
    display: flex;
    flex-direction: column;
    height: 100%;

    p {
      display: flex;
      align-items: center;
      flex-grow: 1;
      padding: 16px 0px 16px 16px;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.33;
      cursor: pointer;

      :hover {
        border-radius: 16px;
        background-color: #f4f5f6;
      }
    }

    .color {
      color: #5e4fff;
    }
  }
`;

export default StackingPage;
