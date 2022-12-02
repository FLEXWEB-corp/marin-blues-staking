import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Group from '../components/Group';
import Info from '../components/Info';
import Single from '../components/Single';
import useStaking from '../hooks/useStaking';
import AddNft from '../components/AddNft';
import SelectNft from '../components/SelectNft';
import Modal from '../components/Modal';
import styled, { keyframes } from 'styled-components';
import TabMenu from '../components/TabMenu';

const StackingPage: NextPage<{
  tab: string;
  tabClick: boolean;
  onChangeTab: () => void;
  onClickTabChoice: (item: string) => void;
}> = ({ tab, tabClick, onChangeTab, onClickTabChoice }): JSX.Element => {
  const [tabMenu, setTabMenu] = useState<'single' | 'group'>('single');
  const [addModal, setAddModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [groupUnModal, setGroupUnModal] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const {
    state,
    onStaking,
    onUnStaking,
    onToggle,
    onSelectGroup,
    onGroupStaking,
    onGroupUnStaking,
    closeError,
    closeSuccess,
    unSelect,
    unCheckAll,
  } = useStaking();

  const onSelect = useCallback(
    (tokenId: number) => {
      activeGroupId !== null && onSelectGroup(tokenId, activeGroupId);
    },
    [activeGroupId],
  );
  // const onSelectUn = useCallback(
  //   (tokenId: number) => {
  //     activeGroupId !== null && onSelectUnGroup(tokenId, activeGroupId);
  //   },
  //   [activeGroupId],
  // );

  const parkingUnSelect = useCallback(
    (tokenId: number) => {
      unSelect(tokenId);
    },
    [unSelect],
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
        isPark={state.stakableNfts.length > 0}
        totalORT={totalORT}
      />
      <TabMenu
        tab={tabMenu}
        onMove={(tab: 'single' | 'group') => {
          setTabMenu(tab);
        }}
      />
      <Single
        data={state.stakingNfts}
        onClick={() => setAddModal(true)}
        onUnStaking={onUnStaking}
        show={tabMenu === 'single'}
      />
      <Group
        groupNfts={state.groupNfts}
        groupStakingNfts={state.groupStakingNfts}
        onClick={(id: number) => {
          setGroupModal(true);
          setActiveGroupId(id);
        }}
        onGroupStaking={onGroupStaking}
        onGroupUnStaking={onGroupUnStaking}
        unSelect={parkingUnSelect}
        show={tabMenu === 'group'}
      />
      {/* <Group
        title={'Group UnStaking'}
        type="unstaking"
        show={tabMenu === 'group'}
        groupNfts={state.groupUnStakingNfts}
        onClick={(id: number) => {
          setGroupUnModal(true);
          setActiveGroupId(id);
        }}
        onGroupStaking={onGroupStaking}
        onGroupUnStaking={onGroupUnStaking}
        unSelect={parkingUnSelect}
      /> */}
      {addModal && (
        <AddNft
          nfts={state.stakableNfts}
          onClose={() => setAddModal(false)}
          onStaking={onStaking}
          onToggle={onToggle}
          unCheckAll={unCheckAll}
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
      {/* {groupUnModal && (
        <SelectNft
          nfts={state.stakingNfts.filter(nft =>
            state.groupUnStakingNfts.every(
              groupNft => groupNft?.tokenId !== nft.tokenId,
            ),
          )}
          onClose={() => setGroupUnModal(false)}
          onSelect={onSelectUn}
        />
      )} */}
      {state.loading && (
        <Modal onClose={() => {}} height="auto" width="448px">
          <ModalContainer>
            <h2 className="title">{state.loadingText}</h2>
            <div className="content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="spin"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M38.433 20.513c.9 0 1.637.73 1.562 1.627A19.55 19.55 0 0 1 22.14 39.995c-.897.075-1.627-.662-1.627-1.562v-.651c0-.9.731-1.62 1.626-1.714a15.64 15.64 0 0 0 13.929-13.929c.093-.895.814-1.626 1.714-1.626h.651z"
                    fill="#5E4FFF"
                  />
                  <path
                    d="M38.596 17.266c.922-.127 1.572-.963 1.366-1.851a19.62 19.62 0 0 0-4.12-8.212 20.243 20.243 0 0 0-9.023-6.124 20.661 20.661 0 0 0-10.965-.61 20.374 20.374 0 0 0-9.676 5.084 19.699 19.699 0 0 0-5.533 9.28 19.374 19.374 0 0 0 .239 10.741 19.75 19.75 0 0 0 5.94 9.036 20.378 20.378 0 0 0 8.247 4.315c.9.232 1.777-.374 1.939-1.27l.117-.65c.162-.897-.454-1.744-1.35-1.995a16.293 16.293 0 0 1-6.271-3.364 15.799 15.799 0 0 1-4.753-7.229 15.5 15.5 0 0 1-.191-8.592A15.759 15.759 0 0 1 8.989 8.4a16.298 16.298 0 0 1 7.74-4.068 16.53 16.53 0 0 1 8.772.488c2.823.95 5.321 2.646 7.22 4.9a15.703 15.703 0 0 1 3.217 6.248c.224.884 1.068 1.515 1.99 1.389l.668-.092z"
                    fill="#B1B5C3"
                  />
                </g>
              </svg>
              <div className="description">
                <p>Waiting</p>
                <p>Tickling the backend…</p>
              </div>
            </div>
          </ModalContainer>
        </Modal>
      )}
      {state.error && (
        <Modal onClose={closeError} height="280px" width="448px">
          <ModalContainer className="error">
            <div className="close-inner" onClick={closeError}>
              <img src="./images/close.png" />
            </div>

            <h2 className="title">{state.loadingText}</h2>
            <div className="description">
              Something went wrong, Please try again or report this issue in the
              Support page.
            </div>
          </ModalContainer>
        </Modal>
      )}
      {state.success && (
        <Modal onClose={closeSuccess} height="288px" width="448px">
          <ModalContainer className="error">
            <div className="close-inner" onClick={closeSuccess}>
              <img src="./images/close.png" />
            </div>

            <h2 className="title">Yay! 🎉</h2>
            <div className="description">
              {`ORT claimed!\nYou now have more ORT than E.Musk 😎\nWe hope this made your day!`}
            </div>
          </ModalContainer>
        </Modal>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  max-width: 1440px;
  padding: 0 160px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 0 11px;
  }

  .crystal-img {
    position: absolute;
    top: 0;
    right: 0;
    object-fit: contain;
    z-index: -1;
    @media (max-width: 480px) {
      width: 176px;
      height: 197px;
    }
  }

  .top-title {
    @media (max-width: 480px) {
      margin: 24px 0 0 21px;
    }

    h1 {
      font-size: 40px;
      font-weight: 600;
      color: #23262f;
      margin-bottom: 64px;
      @media (max-width: 480px) {
        margin-bottom: 40px;
      }

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

const Spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(359deg);
}
`;

const ModalContainer = styled.div`
  .title {
    margin-bottom: 37px;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.25;
    color: #23262f;
    white-space: pre-wrap;
  }

  &.error .title {
    font-size: 48px;
    font-weight: bold;
    line-height: 1.17;
    letter-spacing: -0.96px;
    text-align: center;
    color: #23262f;
  }

  &.error .description {
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    color: #23262f;
    white-space: pre-wrap;
  }

  .close-inner {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    border-radius: 48px;
    border: solid 2px #e6e8ec;
    cursor: pointer;
  }

  .content {
    display: flex;
    gap: 0 20px;

    .spin {
      animation: ${Spin} 1s linear infinite;
    }
    .description {
      p {
        &:nth-of-type(1) {
          font-size: 16px;
          font-weight: 500;
          line-height: 1.5;
          color: #23262f;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          line-height: 1.71;
          color: #777e90;
        }
      }
    }
  }
`;

export default StackingPage;
