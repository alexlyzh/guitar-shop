import {STARS_COUNT} from '../../../const';

const FULL_STAR_SPRITE_ID = '#icon-full-star';
const EMPTY_STAR_SPRITE_ID = '#icon-star';

export default function StarRating({rating}: {rating: number}): JSX.Element {
  const stars = new Array(STARS_COUNT).fill(null).map((star, i) => {
    if (i < rating) {
      return FULL_STAR_SPRITE_ID;
    }
    return EMPTY_STAR_SPRITE_ID;
  });

  return (
    <>
      {stars.map((star, i) => {
        const key = `${i}-star`;
        return (
          <svg width="12" height="11" key={key} aria-hidden="true">
            <use xlinkHref={star}/>
          </svg>
        );
      })}
    </>
  );
}
