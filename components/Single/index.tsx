import React, { Fragment, useEffect, useState } from 'react';
import { getElapsedHMS } from '../../utilty/helper';
import Button from '../Button';
import SingleItem from '../SingleItem';
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

  const onSelect = (tokenId: number) => {
    setActiveId(tokenId);
    setStakingModal(prev => !prev);
  };

  return (
    <SingleContainer show={show}>
      <h2>Single Parking</h2>
      <div className="single-container">
        {data.length > 0 &&
          data.map((item, idx) => (
            <SingleItem item={item} key={idx} onSelect={onSelect} />
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
