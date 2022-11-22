import React from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import Button from '../Button';

interface AddNftProps {
  nfts: any[];
  onClose: () => void;
  onStaking: (id: number, contractAddress: string) => void;
  onToggle: (id: number) => void;
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
    @media (max-width: 480px) {
      margin-bottom: 16px;
    }
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

    @media (max-width: 480px) {
      display: none;
    }
  }

  .nft-list-inner {
    margin: 32px 0 24px;
    width: 100%;
    height: 384px;
    padding: 8px 20px 16px 8px;
    border-radius: 12px;
    border: solid 2px #e6e8ec;
    overflow-y: auto;

    @media (max-width: 480px) {
      height: 320px;
      margin: 16px 0;
      padding: 8px 10px 16px 8px;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 400px;
      background-color: #5e4fff;
    }

    .item-inner {
      display: flex;
      align-items: center;
      gap: 0 8px;

      svg {
        cursor: pointer;
      }

      img {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        background-color: #e6e8ec;
      }

      .content {
        display: flex;
        align-items: center;
        flex: 1;
        gap: 0 16px;
        padding: 8px;
        border-radius: 12px;
        overflow: hidden;
        :hover {
          background-color: #f4f5f6;
        }

        .text-inner {
          overflow: hidden;
          p:nth-child(1) {
            font-size: 16px;
            font-weight: 600;
            line-height: 1.25;
            color: #23262f;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          p:nth-child(2) {
            font-size: 14px;
            font-weight: 500;
            line-height: 1.71;
            color: #777e90;
          }
        }
      }
    }
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
  }
`;

const AddNft = ({ nfts, onClose, onStaking, onToggle }: AddNftProps) => {
  return (
    <Modal height="auto" onClose={onClose}>
      <AddNftContainer>
        <div className="header-inner">
          <h1>Available to Park</h1>
          <div className="close-inner" onClick={onClose}>
            <img src="./images/close.png" />
          </div>
        </div>
        <p>
          Here are the NFTs available to park in this Parking Lot. Feel free to
          choose more than one!
        </p>
        <div className="nft-list-inner">
          {nfts &&
            nfts.length > 0 &&
            nfts.map(item => (
              <div className="item-inner" key={item.tokenId}>
                {item.checked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    onClick={() => {
                      onToggle(item.tokenId);
                    }}
                  >
                    <path
                      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2.65 6.73-5.62 5.62a.48.48 0 0 1-.7 0L7.65 13a.5.5 0 0 1 0-.71l.53-.53a.48.48 0 0 1 .7 0l1.5 1.49 4.74-4.74a.5.5 0 0 1 .7 0l.53.53a.5.5 0 0 1 0 .69z"
                      fill="#5E4FFF"
                      fill-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    onClick={() => {
                      onToggle(item.tokenId);
                    }}
                  >
                    <path
                      d="M19 5v14H5V5h14zm0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                      fill="#B1B5C3"
                      fillRule="evenodd"
                    />
                  </svg>
                )}
                <div
                  className="content"
                  onClick={() => {
                    onStaking(item.tokenId, item.contract.address);
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
                    <p>{item.contractMetadata.name}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="btn-container">
          <Button width="120px" height="40px" buttonTheme="white">
            Clear
          </Button>

          <Button width="120px" height="40px" buttonTheme="black">
            Done
          </Button>
        </div>
      </AddNftContainer>
    </Modal>
  );
};

export default AddNft;
