import {ChangeEventHandler} from 'react';
import {StarSpriteID} from '../../../const';

type Props = {
  rating: string | undefined,
  isDisabled: boolean,
  onInputChange: ChangeEventHandler<HTMLInputElement>,
  shouldShowRateWarning: boolean,
}

function RadioStarRating({rating, isDisabled = false, onInputChange, shouldShowRateWarning}: Props): JSX.Element {
  return (
    <>
      <span className="form-review__label form-review__label--required">Ваша Оценка</span>
      <div className="rate">
        <input
          className="visually-hidden" type="radio" id="star-1" name="rate" value="1"
          checked={rating === '1'}
          disabled={isDisabled}
          onChange={onInputChange}
        />
        <label className="rate__label" htmlFor="star-1" title="Ужасно">
          <svg width={'100%'} height={'100%'} aria-hidden="true">
            <use xlinkHref={ (Number(rating) >= 1) ? StarSpriteID.FULL : StarSpriteID.EMPTY }/>
          </svg>
        </label>
        <input
          className="visually-hidden" type="radio" id="star-2" name="rate" value="2"
          checked={rating === '2'}
          disabled={isDisabled}
          onChange={onInputChange}
        />
        <label className="rate__label" htmlFor="star-2" title="Плохо">
          <svg width={'100%'} height={'100%'} aria-hidden="true">
            <use xlinkHref={ (Number(rating) >= 2) ? StarSpriteID.FULL : StarSpriteID.EMPTY }/>
          </svg>
        </label>
        <input
          className="visually-hidden" type="radio" id="star-3" name="rate" value="3"
          checked={rating === '3'}
          disabled={isDisabled}
          onChange={onInputChange}
        />
        <label className="rate__label" htmlFor="star-3" title="Нормально">
          <svg width={'100%'} height={'100%'} aria-hidden="true">
            <use xlinkHref={ (Number(rating) >= 3) ? StarSpriteID.FULL : StarSpriteID.EMPTY }/>
          </svg>
        </label>
        <input
          className="visually-hidden" type="radio" id="star-4" name="rate" value="4"
          checked={rating === '4'}
          disabled={isDisabled}
          onChange={onInputChange}
        />
        <label className="rate__label" htmlFor="star-4" title="Хорошо">
          <svg width={'100%'} height={'100%'} aria-hidden="true">
            <use xlinkHref={ (Number(rating) >= 4) ? StarSpriteID.FULL : StarSpriteID.EMPTY }/>
          </svg>
        </label>
        <input
          className="visually-hidden" type="radio" id="star-5" name="rate" value="5"
          checked={rating === '5'}
          disabled={isDisabled}
          onChange={onInputChange}
        />
        <label className="rate__label" htmlFor="star-5" title="Отлично">
          <svg width={'100%'} height={'100%'} aria-hidden="true">
            <use xlinkHref={ (Number(rating) >= 5) ? StarSpriteID.FULL : StarSpriteID.EMPTY }/>
          </svg>
        </label>
        <span className="rate__count visually-hidden">{rating}</span>
        <span className="rate__message">
          { shouldShowRateWarning ? 'Поставьте оценку' : null }
        </span>
      </div>
    </>
  );
}

export default RadioStarRating;
