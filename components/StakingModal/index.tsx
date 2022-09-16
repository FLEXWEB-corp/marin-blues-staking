import React from "react";
import Modal from "../Modal";
import styled from "styled-components";

interface Props {
  status: string;
  onClose: () => void;
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

  .black-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    font-size: 16px;
    color: #fcfcfd;
    margin-top: 32px;
    border-radius: 90px;
    background-color: #141416;
    cursor: pointer;
    margin-bottom: 8px;
  }

  .white-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    color: #23262f;
    border-radius: 90px;
    border: solid 2px #e6e8ec;
    cursor: pointer;
  }
`;

const StakingModal = ({ status, onClose }: Props) => {
  return (
    <Modal onClose={onClose}>
      <StakingModalContainer>
        <div className="header-inner">
          <h1>Claim Profits</h1>
          <div className="close-inner" onClick={onClose}>
            <img src="./images/close.png" />
          </div>
        </div>
        <p>
          {status === "ing"
            ? "The staking of that NFT has not ended. You can only receive staking rewards so far."
            : "Staking has ended successfully! You can get rewards and restart or quit staking"}
        </p>
        <div className="black-btn">
          {status === "ing"
            ? "Get Currently Obtainable Rewards Only"
            : "Claim & Restart Staking"}
        </div>
        <div className="white-btn">Get Rewards & Quit Staking</div>
      </StakingModalContainer>
    </Modal>
  );
};

export default StakingModal;
