import React from 'react';
import Button from '../Button';
import { GroupContainer } from './style';

const Group = ({
  title,
  type,
  groupNfts,
  onClick,
  onGroupStaking,
  onGroupUnStaking,
}: {
  title: string;
  type: 'staking' | 'unstaking';
  groupNfts: any[];
  onClick: (id: number) => void;
  onGroupStaking: () => void;
  onGroupUnStaking: () => void;
}) => {
  return (
    <GroupContainer>
      <h2>{title}</h2>
      <div className="group-inner">
        <div className="img-box">
          {groupNfts.map((el: any, idx) => (
            <div
              className="plus_single_inner"
              key={idx}
              onClick={() => {
                onClick(idx);
              }}
            >
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
            </div>
          ))}
        </div>
        <div className="info-box">
          {type === 'staking' &&
            [
              'Group Bnous : 10%',
              '0d : 0h : 0m',
              groupNfts.every(el => el) ? '1 ORT' : '0 ORT',
            ].map((item, idx) => (
              <div
                className={`item-box ${
                  groupNfts.length > 0 && idx === 0 ? 'active' : ''
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
              claim
            </Button>
          ) : (
            <Button
              width="125px"
              height="36px"
              buttonTheme="black"
              onClick={onGroupStaking}
            >
              start
            </Button>
          )}
        </div>
      </div>
    </GroupContainer>
  );
};

export default Group;
