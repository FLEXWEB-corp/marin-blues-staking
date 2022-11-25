import { getElapsedHMS } from '../../utilty/helper';
import Button from '../Button';

interface GroupItemProps {
  nfts: any[];
  onGroupUnStaking: (idx: number) => void;
}

export default function GroupItem({ nfts, onGroupUnStaking }: GroupItemProps) {
  return (
    <div className="group-inner">
      <div className="img-box">
        <div className="grid">
          <div className="hidden-box">
            <p>Group Bonus :</p>
            <p>10%</p>
          </div>
          {nfts.map((el, idx) => (
            <div className="plus_single_inner">
              <img
                src={
                  el.media[0]?.thumbnail ||
                  el.media[0]?.gateway ||
                  '/images/test.avif'
                }
              />
              {el && (
                <img
                  src="/images/close.webp"
                  alt="close"
                  className="close"
                  onClick={e => {
                    e.stopPropagation();
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
          <Button width="100%" height="48px" buttonTheme="black">
            Claim
          </Button>
        </div>
      </div>
      <div className="info-box">
        {[
          'Group Bonus : 10%',
          getElapsedHMS(nfts[0]?.stakingAt),
          nfts.reduce((acc, cv) => (acc += +cv.reward), 0).toFixed(2) + ' ORT',
        ].map((item, idx) => (
          <div
            className={`item-box ${
              nfts.some(el => el) && idx === 0 ? 'active' : ''
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
          // onClick={() => onGroupUnStaking(idx)}
        >
          Claim
        </Button>
      </div>
    </div>
  );
}
