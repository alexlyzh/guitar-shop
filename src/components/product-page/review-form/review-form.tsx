import { useSelector } from 'react-redux';
import { getIsSubmitting } from '../../../store/reducer/app-reducer/selectors';
import { useFormState } from '../../../hooks/use-form-state/use-form-state';
import { Guitar, ReviewFormState } from '../../../types/types';
import { usePostReview } from '../../../hooks/use-post-review/use-post-review';
import { useCallback, useEffect } from 'react';
import { MODAL_FADE_OUT_DURATION } from '../../../const';
import RadioStarRating from '../../common/radio-star-rating/radio-star-rating';

const initialState: ReviewFormState = {
  'user-name': '',
  advantage: '',
  disadvantage: '',
  review: '',
};

type Props = {
  product: Guitar,
  isModalOpen?: boolean,
  onSubmitSuccess?: () => void,
}

function ReviewForm({product, isModalOpen, onSubmitSuccess}: Props): JSX.Element {
  const isSubmitting = useSelector(getIsSubmitting);
  const [state, setState, onFormElementChange] = useFormState<ReviewFormState>(initialState);
  const [
    shouldShowUsernameWarning,
    shouldShowRateWarning,
    setHasFormBeenSent,
    onReviewFormSubmit,
  ] = usePostReview(product.id, state, onSubmitSuccess);

  const resetForm = useCallback(() => {
    setState(initialState);
    setHasFormBeenSent(false);
  }, [setState, setHasFormBeenSent]);

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(resetForm, MODAL_FADE_OUT_DURATION);
    }
  }, [isModalOpen, resetForm]);

  return (
    <>
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{product.name}</h3>
      <form className="form-review" onSubmit={onReviewFormSubmit}>
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
            <input className="form-review__input form-review__input--name" id="user-name" name="user-name" type="text"
              autoComplete="off"
              autoFocus
              disabled={isSubmitting}
              value={state['user-name']}
              onChange={onFormElementChange}
            />
            <span className="form-review__warning" style={{height: '15px'}}>
              { shouldShowUsernameWarning ? 'Заполните поле' : null }
            </span>
          </div>
          <div>
            <RadioStarRating
              rating={state.rate}
              isDisabled={isSubmitting}
              onInputChange={onFormElementChange}
              shouldShowRateWarning={shouldShowRateWarning}
            />
          </div>
        </div>
        <label className="form-review__label" htmlFor="advantage">Достоинства</label>
        <input className="form-review__input" id="advantage" name="advantage" type="text" autoComplete="off"
          value={state.advantage}
          disabled={isSubmitting}
          onChange={onFormElementChange}
        />
        <label className="form-review__label" htmlFor="disadvantage">Недостатки</label>
        <input className="form-review__input" id="disadvantage" name="disadvantage" type="text" autoComplete="off"
          value={state.disadvantage}
          disabled={isSubmitting}
          onChange={onFormElementChange}
        />
        <label className="form-review__label" htmlFor="review">Комментарий</label>
        <textarea className="form-review__input form-review__input--textarea" id="review" name="review" rows={10} autoComplete="off"
          value={state.review}
          onChange={onFormElementChange}
        />
        <button className="button button--medium-20 form-review__button" type="submit"
          disabled={isSubmitting}
        >
          Отправить отзыв
        </button>
      </form>
    </>
  );
}

export default ReviewForm;
