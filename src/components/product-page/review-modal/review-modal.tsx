import { Guitar, ReviewFormState } from '../../../types/types';
import { useFormState } from '../../../hooks/use-form-state/use-form-state';
import { usePostReview } from '../../../hooks/use-post-review/use-post-review';
import {useSelector} from 'react-redux';
import {getIsSubmitting} from '../../../store/reducer/app-reducer/selectors';

type Props = {
  product: Guitar,
}

const initialState: ReviewFormState = {
  'user-name': '',
  advantage: '',
  disadvantage: '',
  review: '',
};

function ReviewModal({product}: Props): JSX.Element {
  const isSubmitting = useSelector(getIsSubmitting);
  const [state, onFormElementChange] = useFormState<ReviewFormState>(initialState);
  const [isDataValid, onReviewFormSubmit] = usePostReview(product.id, state);

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
              required
              disabled={isSubmitting}
              value={state['user-name']}
              onChange={onFormElementChange}
            />
            <span className="form-review__warning" style={{height: '15px'}}>{state['user-name']?.length ? null : 'Заполните поле'}</span>
          </div>
          <div>
            <span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className="rate rate--reverse">
              <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5"
                checked={state.rate === '5'}
                disabled={isSubmitting}
                onChange={onFormElementChange}
              />
              <label className="rate__label" htmlFor="star-5" title="Отлично"/>
              <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4"
                checked={state.rate === '4'}
                disabled={isSubmitting}
                onChange={onFormElementChange}
              />
              <label className="rate__label" htmlFor="star-4" title="Хорошо"/>
              <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3"
                checked={state.rate === '3'}
                disabled={isSubmitting}
                onChange={onFormElementChange}
              />
              <label className="rate__label" htmlFor="star-3" title="Нормально"/>
              <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2"
                checked={state.rate === '2'}
                disabled={isSubmitting}
                onChange={onFormElementChange}
              />
              <label className="rate__label" htmlFor="star-2" title="Плохо"/>
              <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1"
                checked={state.rate === '1'}
                disabled={isSubmitting}
                onChange={onFormElementChange}
              />
              <label className="rate__label" htmlFor="star-1" title="Ужасно"/>
              <span className="rate__count visually-hidden">{state.rate}</span>
              <span className="rate__message">{state.rate ? null : 'Поставьте оценку'}</span>
            </div>
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
        <button className="button button--medium-20 form-review__button" type="submit" disabled={!isDataValid}>Отправить отзыв</button>
      </form>
    </>
  );
}

export default ReviewModal;
