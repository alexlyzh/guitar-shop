import {Link} from 'react-router-dom';
import {Guitar} from '../../../types/types';
import StarRating from './star-rating/star-rating';

type GuitarListProps = {
  guitars: Guitar[],
}

function GuitarList({guitars}: GuitarListProps): JSX.Element {
  return (
    <>
      <div className="catalog-sort">
        <h2 className="catalog-sort__title">Сортировать:</h2>
        <div className="catalog-sort__type">
          <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене" tabIndex={-1}>
            по цене
          </button>
          <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
        </div>
        <div className="catalog-sort__order">
          <button
            className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active"
            aria-label="По возрастанию" tabIndex={-1}
          >
          </button>
          <button className="catalog-sort__order-button catalog-sort__order-button--down"
            aria-label="По убыванию"
          >
          </button>
        </div>
      </div>

      <div className="cards catalog__cards">
        {guitars.map((guitar) => {
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
        })}
      </div>

      <div className="pagination page-content__pagination">
        <ul className="pagination__list">
          <li className="pagination__page pagination__page--active">
            <Link className="link pagination__page-link" to="#">1</Link>
          </li>
          <li className="pagination__page">
            <Link className="link pagination__page-link" to="#">2</Link>
          </li>
          <li className="pagination__page">
            <Link className="link pagination__page-link" to="#">3</Link>
          </li>
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#">Далее</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default GuitarList;
