import {Guitar} from '../../../types/types';
import StarRating from '../star-rating/star-rating';
import {Link} from 'react-router-dom';

type Props = {
  guitars: Guitar[],
}

function Cards({guitars}: Props): JSX.Element {
  return (
    <div className={`cards catalog__cards ${!guitars.length ? 'catalog__cards--empty': ''}`}>
      {guitars.length
        ?
        guitars.map((guitar) => {
          const {id, name, price, rating, previewImg} = guitar;
          return (
            <div className="product-card" key={id}>
              <img src={previewImg} width="75" height="190" alt={name}/>
              <div className="product-card__info">
                <div className="rate product-card__rate" aria-hidden="true">
                  <span className="visually-hidden">Рейтинг:</span>
                  <StarRating rating={rating} />

                  <span className="rate__count">9</span><span className="rate__message"/>
                </div>
                <p className="product-card__title">{name}</p>
                <p className="product-card__price">
                  <span className="visually-hidden">Цена:</span>
                  {`${price} ₽`}
                </p>
              </div>
              <div className="product-card__buttons">
                <Link className="button button--mini" to="#">Подробнее</Link>
                <Link className="button button--red button--mini button--add-to-cart" to="#">Купить</Link>
              </div>
            </div>
          );
        }) : 'Ничего не нашлось'}
    </div>
  );
}

export default Cards;