import { getElapsedHMS } from '../../utilty/helper';
import Button from '../Button';

export default function SingleItem({
  item,
  onSelect,
}: {
  item: any;
  onSelect: (tokenId: number) => void;
}) {
  return (
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
          onClick={() => onSelect(item.id)}
        >
          Claim
        </Button>
      </div>
    </div>
  );
}
