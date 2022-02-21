import StarRating from '../../../../common/star-rating/star-rating';
import CartModal from '../../../../common/cart-modal/cart-modal';
import { generatePath, Link } from 'react-router-dom';
import { GuitarWithComments, ModalType } from '../../../../../types/types';
import { AppPath } from '../../../../../const/app-routes';

type Props = {
  guitar: GuitarWithComments,
}

function GuitarCard({guitar}: Props): JSX.Element {
  const {id, name, price, rating, previewImg} = guitar;
  return (
    <div className="product-card" key={id} data-testid={'product-card'}>
      <img src={previewImg} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <StarRating rating={rating} starWidth={12} starHeight={11} />

          <span className="rate__count" data-testid="guitar-rate-count">
            {guitar.comments.length}
          </span>
          <span className="rate__message"/>
        </div>
        <p className="product-card__title" data-testid="guitar-name">{name}</p>
        <p className="product-card__price" data-testid="guitar-price">
          <span className="visually-hidden">Цена:</span>
          {`${price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={generatePath(AppPath.product, {id})}>Подробнее</Link>
        <CartModal product={guitar} type={ModalType.catalogCart} />

      </div>
    </div>
  );
}

export default GuitarCard;
