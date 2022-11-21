import React from 'react';
import Modal from '../Modal';
import styled from 'styled-components';

interface SelectNftProps {
  nfts: any[];
  onClose: () => void;
  onSelect: (id: number) => void;
}

export const AddNftContainer = styled.div`
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

  .nft-list-inner {
    margin-top: 32px;
    width: 100%;
    height: 384px;
    padding: 16px 8px 24px;
    border-radius: 12px;
    border: solid 2px #e6e8ec;
    overflow-y: auto;
    max-height: 384px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 400px;
      background-color: #5e4fff;
    }

    .item-inner {
      display: flex;
      margin-bottom: 8px;

      img {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        background-color: #e6e8ec;
        margin-right: 16px;
      }

      .text-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        p:nth-child(1) {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.25;
          color: #23262f;
        }
        p:nth-child(2) {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.71;
          color: #777e90;
        }
      }
      :hover {
        border-radius: 12px;
        background-color: #f4f5f6;
      }
    }
  }
`;

const SelectNft = ({ nfts, onClose, onSelect }: SelectNftProps) => {
  return (
    <Modal height="600px" onClose={onClose}>
      <AddNftContainer>
        <div className="header-inner">
          <h1>Stakable NFTs</h1>
          <div className="close-inner" onClick={onClose}>
            <img src="./images/close.png" />
          </div>
        </div>
        <p>This is a list of NFTs for which staking services are available.</p>
        <div className="nft-list-inner">
          {nfts &&
            nfts.length > 0 &&
            nfts.map(item => (
              <div
                className="item-inner"
                key={item.tokenId}
                onClick={() => {
                  onSelect(item.tokenId);
                  onClose();
                }}
              >
                <img
                  src={
                    item.media[0]?.thumbnail ||
                    item.media[0]?.gateway ||
                    'https://testnets.opensea.io/static/images/placeholder.png'
                  }
                />
                <div className="text-inner">
                  <p>{item.title}</p>
                  <p>{item.tokenId}</p>
                </div>
              </div>
            ))}
        </div>
      </AddNftContainer>
    </Modal>
  );
};

export default SelectNft;
