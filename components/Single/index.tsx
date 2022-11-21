import React, { Fragment, useEffect, useState } from 'react';
import Button from '../Button';
import StakingModal from '../StakingModal';
import { SingleContainer } from './style';

const Single = ({
  data,
  onClick,
  onUnStaking,
  show,
}: {
  data: any[];
  show: boolean;
  onClick: () => void;
  onUnStaking: (tokenId: number) => void;
}) => {
  const [activeId, setActiveId] = useState<null | number>(null);
  const [stakingModal, setStakingModal] = useState(false);

  const getElapsedHMS = (timestamp: number) => {
    const elapsedSec = (Date.now() - timestamp * 1000) / 1000;

    const elapsedHour = Math.floor(elapsedSec / 3600);
    const elaspedMinute = Math.floor((elapsedSec % 3600) / 60);
    const elaspedSecond = Math.floor((elapsedSec % 3600) % 60);

    return `${elapsedHour}h : ${elaspedMinute}m : ${elaspedSecond}s`;
  };

  return (
    <SingleContainer show={show}>
      <h2>Single Parking</h2>
      <div className="single-container">
        {data.length > 0 &&
          data.map((item, idx) => (
            <Fragment key={idx}>
              <div className="item-inner">
                <img
                  src={
                    item.media[0]?.thumbnail ||
                    item.media[0]?.gateway ||
                    'https://testnets.opensea.io/static/images/placeholder.png'
                  }
                />
                <div className="info-inner">
                  <p>{item.title || item.contractMetadata.name}</p>
                  <p>{getElapsedHMS(item.stakingAt)}</p>
                  <p>{Number(item.reward).toFixed(2)} ORT</p>
                  <p>{item.ort}</p>
                  <Button
                    width="126px"
                    height="36px"
                    margin="0 auto"
                    buttonTheme="white"
                    onClick={() => {
                      setActiveId(item.tokenId);
                      setStakingModal(prev => !prev);
                    }}
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </Fragment>
          ))}
        <div className="plus_single_inner" onClick={onClick}>
          <div className="img-container">
            <img src="/images/plus.png" />
          </div>
          <div className="item-inner">
            <div className="info-inner">
              <p>Empty</p>
              <p>30d : 00h : 00m</p>
              <p>0 ORT</p>
              <Button
                width="126px"
                height="36px"
                margin="0 auto"
                buttonTheme="white"
                disabled
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      </div>
      {stakingModal && (
        <StakingModal
          status="ing"
          onClose={() => setStakingModal(false)}
          onUnStaking={() => {
            activeId && onUnStaking(activeId);
          }}
        />
      )}
    </SingleContainer>
  );
};

export default Single;
