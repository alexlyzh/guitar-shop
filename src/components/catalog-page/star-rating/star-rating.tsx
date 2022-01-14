import {STARS_COUNT} from '../../../const';

enum StarSpriteID {
  FULL = '#icon-full-star',
  EMPTY = '#icon-star',
}

export default function StarRating({rating}: {rating: number}): JSX.Element {
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
          <svg width="12" height="11" key={key} aria-hidden="true"
            data-testid={star === StarSpriteID.FULL ? 'full' : 'empty'}
          >
            <use xlinkHref={star}/>
          </svg>
        );
      })}
    </>
  );
}
