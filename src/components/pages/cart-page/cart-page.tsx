import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import CartProduct from './cart-product/cart-product';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getBreadcrumbRoutes } from '../../../utils/common';
import { getCartItems, getDiscount, getTotalCartPrice } from '../../../store/reducer/cart-reducer/selectors';

const PAGE_TITLE = 'Корзина';

function CartPage(): JSX.Element {
  const cartProducts = useSelector(getCartItems);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const discount = useSelector(getDiscount);
  const breadcrumbs = useMemo(() => getBreadcrumbRoutes(PAGE_TITLE)
    .filter((breadcrumb) => !breadcrumb.pathname.includes('/:')), []);

  return (
    <MainLayout>
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <Breadcrumbs routes={breadcrumbs} />

      <div className="cart">
        {cartProducts.map((product) => (
          <CartProduct cartItem={product} key={product.guitar.id} />
        ))}

        <div className="cart__footer">
          <div className="cart__coupon coupon">
            <h2 className="title title--little coupon__title">Промокод на скидку</h2>
            <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
            <form className="coupon__form" id="coupon-form" method="post" action="/">
              <div className="form-input coupon__input">
                <label className="visually-hidden">Промокод</label>
                <input type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                <p className="form-input__message form-input__message--success">Промокод принят</p>
              </div>
              <button className="button button--big coupon__button">Применить</button>
            </form>
          </div>
          <div className="cart__total-info">
            <p className="cart__total-item">
              <span className="cart__total-value-name">Всего:</span>
              <span className="cart__total-value">{totalCartPrice} ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">Скидка:</span>
              <span className={`cart__total-value ${discount !== 0 ? 'cart__total-value--bonus' : ''}`}>{discount} ₽</span>
            </p>
            <p className="cart__total-item">
              <span className="cart__total-value-name">К оплате:</span>
              <span className="cart__total-value cart__total-value--payment">{totalCartPrice + discount} ₽</span>
            </p>
            <button className="button button--red button--big cart__order-button">Оформить заказ</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CartPage;
