import React, { Fragment, useState } from 'react';
import { singleData } from '../../pages/data';
import AddNft from '../AddNft';
import Button from '../Button';
import StakingModal from '../StakingModal';
import { SingleContainer } from './style';

const Single = ({
  data,
  onStaking,
}: {
  data: any[];
  onStaking: (id: number, contractAddress: string) => void;
}) => {
  const [addModal, setAddModal] = useState(false);
  const [stakingModal, setStakingModal] = useState(false);

  console.log('data:', data);

  return (
    <SingleContainer>
      <h2>Single Staking</h2>
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
                  <p>{item.title}</p>
                  <p>30h : 00m : 00s</p>
                  <p>{item.ort}</p>
                  <Button
                    width="126px"
                    height="36px"
                    margin="0 auto"
                    buttonTheme="white"
                    onClick={() => setStakingModal(prev => !prev)}
                  >
                    start
                    {/* Claim */}
                  </Button>
                </div>
              </div>
              {data.length === idx + 1 && (
                <div
                  className="plus_single_inner"
                  onClick={() => setAddModal(prev => !prev)}
                >
                  <img src="/images/plus.png" />
                </div>
              )}
            </Fragment>
          ))}
      </div>

      {addModal && (
        <AddNft
          nfts={data}
          onClose={() => setAddModal(false)}
          onStaking={onStaking}
        />
      )}
      {stakingModal && (
        <StakingModal status="ing" onClose={() => setStakingModal(false)} />
      )}
    </SingleContainer>
  );
};

export default Single;
