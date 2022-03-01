import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import CartProductList from './cart-product-list/cart-product-list';
import { useSelector } from 'react-redux';
import { getCartItems, getDiscount, getTotalCartPrice } from '../../../store/reducer/cart-reducer/selectors';
import { AppPath, breadcrumb } from '../../../const/app-routes';
import Coupon from './coupon/coupon';

const breadcrumbs = [
  { ...breadcrumb[AppPath.root] },
  { ...breadcrumb[AppPath.catalog] },
  { ...breadcrumb[AppPath.cart] },
];

function CartPage(): JSX.Element {
  const cartItems = useSelector(getCartItems);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const discount = useSelector(getDiscount);
  const shouldHighlightDiscount = Boolean(totalCartPrice) && discount.size !== 0 ;

  return (
    <MainLayout>
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <Breadcrumbs routes={breadcrumbs} />

      <div className="cart">
        <CartProductList cartItems={cartItems} />

        <div className="cart__footer">
          <Coupon discount={discount} />

          <div className="cart__total-info">
            <p className="cart__total-item">
              <span className="cart__total-value-name">Всего:</span>
              <span className="cart__total-value">{totalCartPrice} ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">Скидка:</span>
              <span className={`cart__total-value ${shouldHighlightDiscount ? 'cart__total-value--bonus' : ''}`}>
                {- discount.size * totalCartPrice} ₽
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
        </div>
      </div>
    </MainLayout>
  );
}

export default CartPage;
