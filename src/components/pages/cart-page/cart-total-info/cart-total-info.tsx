import { CartItem, Discount } from '../../../../types/types';

type Props = {
  cartItems: CartItem[],
  totalCartPrice: number,
  discount: Discount,
  shouldHighlightDiscount: boolean,
}

function CartTotalInfo({cartItems, totalCartPrice, discount, shouldHighlightDiscount}: Props): JSX.Element {
  return (
    <div className="cart__total-info" aria-label="cart total info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">Всего:</span>
        <span className="cart__total-value">{totalCartPrice} ₽</span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        <span className={`cart__total-value ${shouldHighlightDiscount ? 'cart__total-value--bonus' : ''}`}>
          {-discount.size * totalCartPrice} ₽
        </span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">К оплате:</span>
        <span className="cart__total-value cart__total-value--payment">
          {Math.max(0, totalCartPrice - totalCartPrice * discount.size)} ₽
        </span>
      </p>
      <button
        className="button button--red button--big cart__order-button"
        disabled={!cartItems.length}
      >
        Оформить заказ
      </button>
    </div>
  );
}

export default CartTotalInfo;
