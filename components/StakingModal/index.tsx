import React from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import Button from '../Button';

interface Props {
  status: string;
  onClose: () => void;
  onUnStaking: () => void;
}

export const StakingModalContainer = styled.div`
  > p {
    font-size: 16px;
    line-height: 1.5;
    color: #777e90;
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    h1 {
      font-size: 32px;
      font-weight: 600;
      line-height: 1.25;
      color: #23262f;
    }
  }
  .close-inner {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 48px;
    border: solid 2px #e6e8ec;
    cursor: pointer;
  }

  .btn-inner {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 32px;
  }
`;

const StakingModal = ({ status, onClose, onUnStaking }: Props) => {
  return (
    <Modal onClose={onClose}>
      <StakingModalContainer>
        <div className="header-inner">
          <h1>Claim Rewards</h1>
          <div className="close-inner" onClick={onClose}>
            <img src="./images/close.png" />
          </div>
        </div>
        <p>
          {status === 'ing'
            ? 'The Parking Period has not ended yet. You’ll get to receive the rewards you’ve earned so far.'
            : 'Staking has ended successfully! You can get rewards and restart or quit staking'}
        </p>
        <div className="btn-inner">
          <Button width="384px" height="48px" buttonTheme="black">
            {status === 'ing'
              ? 'Claim Cumulated ORT'
              : 'Claim & Restart Staking'}
          </Button>
          <Button
            width="384px"
            height="48px"
            buttonTheme="white"
            onClick={() => {
              onUnStaking();
              onClose();
            }}
          >
            Claim & Pull Out
          </Button>
        </div>
      </StakingModalContainer>
    </Modal>
  );
};

export default StakingModal;
