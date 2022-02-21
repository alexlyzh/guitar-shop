import { CartItem } from '../../../../types/types';
import { guitarType } from '../../../../const/common';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../../../store/reducer/cart-reducer/cart-reducer';

type Props = {
  cartItem: CartItem,
}

function CartProduct({cartItem}: Props): JSX.Element {
  const { guitar, count } = cartItem;
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={() => dispatch(cartAction.remove(guitar))}
      >
        <span className="button-cross__icon"/>
        <span className="cart-item__close-button-interactive-area"/>
      </button>
      <div className="cart-item__image">
        <img src={guitar.previewImg} width="55" height="130" alt={`${guitarType[guitar.type].typeName} ${guitar.name}`}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitarType[guitar.type].typeName} {guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{guitarType[guitar.type].typeName}, {guitar.stringCount}-струнная</p>
      </div>
      <div className="cart-item__price">{guitar.price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={() => dispatch(cartAction.subtract(guitar))}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"/>
          </svg>
        </button>
        <input className="quantity__input" type="number" value={count} id={`${guitar.id}-count`} name={`${guitar.id}-count`} min="1" max="99"/>
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={() => dispatch(cartAction.add(guitar))}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"/>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.price * count} ₽</div>
    </div>
  );
}

export default CartProduct;
