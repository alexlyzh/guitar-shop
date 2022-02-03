import { Guitar } from '../../../types/types';

type Props = {
  product: Guitar,
}

function ReviewModal({product}: Props): JSX.Element {
  return (
    <>
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{product.name}</h3>
      <form className="form-review" onSubmit={(evt) => evt.preventDefault()}>
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
            <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" required/>
            <span className="form-review__warning">Заполните поле</span>
          </div>
          <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className="rate rate--reverse">
              <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5"/>
              <label className="rate__label" htmlFor="star-5" title="Отлично"/>
              <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4"/>
              <label className="rate__label" htmlFor="star-4" title="Хорошо"/>
              <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3"/>
              <label className="rate__label" htmlFor="star-3" title="Нормально"/>
              <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2"/>
              <label className="rate__label" htmlFor="star-2" title="Плохо"/>
              <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1"/>
              <label className="rate__label" htmlFor="star-1" title="Ужасно"/>
              <span className="rate__count"></span><span className="rate__message">Поставьте оценку</span>
            </div>
          </div>
        </div>
        <label className="form-review__label" htmlFor="user-name">Достоинства</label>
        <input className="form-review__input" id="pros" type="text" autoComplete="off"/>
        <label className="form-review__label" htmlFor="user-name">Недостатки</label>
        <input className="form-review__input" id="user-name" type="text" autoComplete="off"/>
        <label className="form-review__label" htmlFor="user-name">Комментарий</label>
        <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off">
        </textarea>
        <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
      </form>
    </>
  );
}

export default ReviewModal;
