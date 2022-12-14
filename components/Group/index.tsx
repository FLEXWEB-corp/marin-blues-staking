import React from 'react';
import Button from '../Button';
import GroupItem from '../GroupItem';
import { GroupContainer } from './style';

const Group = ({
  groupNfts,
  groupStakingNfts,
  show,
  onClick,
  onGroupStaking,
  onGroupUnStaking,
  unSelect,
}: {
  groupNfts: any[];
  groupStakingNfts: any[];
  show: boolean;
  onClick: (id: number) => void;
  onGroupStaking: () => void;
  onGroupUnStaking: (idx: number) => void;
  unSelect: (tokenId: number) => void;
}) => {
  return (
    <GroupContainer show={show}>
      <h2>Group Parking</h2>
      <div className="container">
        {groupStakingNfts.map((nfts, idx) => (
          <GroupItem
            nfts={nfts}
            onGroupUnStaking={onGroupUnStaking}
            key={idx}
            idx={idx}
          />
        ))}
        <div className="group-inner">
          <div className="img-box">
            <div className="grid">
              <div className="hidden-box">
                <p>Group Bonus :</p>
                <p>10%</p>
              </div>

              {groupNfts.map((el: any, idx) => (
                <div
                  className={`plus_single_inner ${el ? 'exist' : ''}`}
                  key={idx}
                  {...(el
                    ? {}
                    : {
                        onClick() {
                          onClick(idx);
                        },
                      })}
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
                  {el && (
                    <img
                      src="/images/close.webp"
                      alt="close"
                      className="close"
                      onClick={e => {
                        e.stopPropagation();
                        console.log('close');
                        unSelect(el.tokenId);
                      }}
                    />
                  )}
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
            {[
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

            <Button
              width="125px"
              height="36px"
              buttonTheme="black"
              disabled={!groupNfts.every(el => el)}
              onClick={onGroupStaking}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </GroupContainer>
  );
};

export default Group;
