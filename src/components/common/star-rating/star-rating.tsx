import { StarSpriteID } from '../../../const/common';
import {getStarRatingSpriteIDs} from '../../../utils/common';

type Props = {
  rating: number,
  starWidth: number,
  starHeight: number,
}

export default function StarRating({rating, starWidth, starHeight}  : Props): JSX.Element {
  const stars = getStarRatingSpriteIDs(rating);

  return (
    <>
      {stars.map((star, i) => {
        const key = `${i}-star`;
        return (
          <svg width={starWidth} height={starHeight} key={key} aria-hidden="true"
            data-testid={star === StarSpriteID.FULL ? 'full' : 'empty'}
          >
            <use xlinkHref={star}/>
          </svg>
        );
      })}
    </>
  );
}
