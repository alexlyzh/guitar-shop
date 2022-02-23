import CartDeleteModal from '../cart-delete-modal/cart-delete-modal';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../hooks/use-modal/use-modal';
import { CartItem } from '../../../../types/types';
import { guitarType } from '../../../../const/common';
import { cartAction, countLimit } from '../../../../store/reducer/cart-reducer/cart-reducer';

type Props = {
  cartItem: CartItem,
}

function CartProduct({cartItem}: Props): JSX.Element {
  const { guitar, count } = cartItem;
  const dispatch = useDispatch();
  const [isDeleteModalOpen, showDeleteModal, hideDeleteModal] = useModal();

  const removeFromCart = () => dispatch(cartAction.remove(guitar));
  const increaseCartCount = () => dispatch(cartAction.add(guitar));

  const decreaseCartCount = () => {
    if (count === countLimit.min) {
      showDeleteModal();
      return;
    }
    dispatch(cartAction.subtract(guitar));
  };

  const setCartCount = ({target}: ChangeEvent<HTMLInputElement>) =>
    dispatch(cartAction.setCount({ guitar, count: target.value }));

  return (
    <div className="cart-item">
      <CartDeleteModal
        guitar={guitar}
        isOpen={isDeleteModalOpen}
        hideModal={hideDeleteModal}
        onRemoveBtnClick={removeFromCart}
      />

      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={showDeleteModal}
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
          onClick={decreaseCartCount}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"/>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          value={count ? count : ''}
          id={`${guitar.id}-count`}
          name={`${guitar.id}-count`}
          onChange={setCartCount}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={increaseCartCount}
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
