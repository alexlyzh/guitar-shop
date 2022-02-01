import {STARS_COUNT} from '../../../const';

enum StarSpriteID {
  FULL = '#icon-full-star',
  EMPTY = '#icon-star',
}

type Props = {
  rating: number,
  starWidth: number,
  starHeight: number,
}

export default function StarRating({rating, starWidth, starHeight}  : Props): JSX.Element {
  const stars = new Array(STARS_COUNT).fill(null).map((star, i) => {
    if (i < rating) {
      return StarSpriteID.FULL;
    }
    return StarSpriteID.EMPTY;
  });

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
