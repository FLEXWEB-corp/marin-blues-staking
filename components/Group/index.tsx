import React from 'react';
import Button from '../Button';
import { GroupContainer } from './style';

const Group = ({
  title,
  type,
  groupNfts,
  show,
  onClick,
  onGroupStaking,
  onGroupUnStaking,
}: {
  title: string;
  type: 'staking' | 'unstaking';
  groupNfts: any[];
  show: boolean;
  onClick: (id: number) => void;
  onGroupStaking: () => void;
  onGroupUnStaking: () => void;
}) => {
  return (
    <GroupContainer show={show}>
      <h2>{title}</h2>
      <div className="group-inner">
        <div className="img-box">
          <div className="grid">
            <div className="hidden-box">
              <p>Group Bonus :</p>
              <p>10%</p>
            </div>
            {groupNfts.map((el: any, idx) => (
              <div
                className="plus_single_inner"
                key={idx}
                onClick={() => {
                  onClick(idx);
                }}
              >
                <div></div>
                <img
                  className={el ? '' : 'plus'}
                  src={
                    el
                      ? el.media[0]?.thumbnail ||
                        el.media[0]?.gateway ||
                        'https://testnets.opensea.io/static/images/placeholder.png'
                      : '/images/plus.png'
                  }
                />
                <img src="/images/close.webp" alt="close" className="close" />
              </div>
            ))}
          </div>
          <div className="mobile-content">
            <div className="field">
              <p className="label">Earned:</p>
              <p className="price">0 ORT</p>
            </div>
            <div className="field">
              <p className="label">Time Parked:</p>
              <p>0h : 0m : 0s</p>
            </div>
            <Button
              width="100%"
              height="48px"
              buttonTheme="black"
              onClick={onGroupStaking}
            >
              Start
            </Button>
          </div>
        </div>
        <div className="info-box">
          {type === 'staking' &&
            [
              'Group Bonus : 10%',
              '0d : 0h : 0m',
              groupNfts.every(el => el) ? '1 ORT' : '0 ORT',
            ].map((item, idx) => (
              <div
                className={`item-box ${
                  groupNfts.some(el => el) && idx === 0 ? 'active' : ''
                }`}
                key={idx}
              >
                <div className="data-box">
                  <p className={idx === 2 ? 'color' : ''}>{item}</p>
                </div>
              </div>
            ))}
          {type === 'unstaking' ? (
            <Button
              width="125px"
              height="36px"
              buttonTheme="black"
              onClick={onGroupUnStaking}
            >
              Claim
            </Button>
          ) : (
            <Button
              width="125px"
              height="36px"
              buttonTheme="black"
              onClick={onGroupStaking}
            >
              Start
            </Button>
          )}
        </div>
      </div>
    </GroupContainer>
  );
};

export default Group;
