import React from 'react';
import Button from '../Button';
import { InfoContainer } from './style';

const Info = ({
  totalCount,
  stakingNfts,
  totalORT,
}: {
  totalCount: number;
  stakingNfts: number;
  totalORT: number;
}) => {
  return (
    <InfoContainer>
      <div className="left-inner">
        <div className="left-inner-box">
          <div className="item-box">
            <div className="data-box">
              <p>Total NFTs</p>
              <p>{totalCount}</p>
            </div>
          </div>
          <div className="item-box">
            <div className="data-box">
              <p>Staking NFTs</p>
              <p className="color">{stakingNfts}</p>
            </div>
          </div>
          <div className="item-box">
            <div className="data-box">
              <p>Total ORT</p>
              <p className="color">{totalORT}</p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <Button buttonTheme="black">Start All</Button>
          <Button buttonTheme="white">Get All ORT</Button>
        </div>
      </div>
      <div className="right-inner">
        <div className="inner-box">
          <div className="text-box">
            <h3>EVENT BOUNUS (10.3~10.16)</h3>
            <p>
              - Wizard Hat <br />
              - Wizard Clothes
              <br />- Wand
            </p>
            <Button buttonTheme="white">View More</Button>
          </div>
          <img src="/images/character.png" />
        </div>
      </div>
    </InfoContainer>
  );
};

export default Info;
