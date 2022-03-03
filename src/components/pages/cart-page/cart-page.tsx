import MainLayout from '../../main-layout/main-layout';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import CartProductList from './cart-product-list/cart-product-list';
import Coupon from './coupon/coupon';
import CartTotalInfo from './cart-total-info/cart-total-info';
import { useSelector } from 'react-redux';
import { getCartItems, getDiscount, getTotalCartPrice } from '../../../store/reducer/cart-reducer/selectors';
import { AppPath, breadcrumb } from '../../../const/app-routes';

const breadcrumbs = [
  { ...breadcrumb[AppPath.root] },
  { ...breadcrumb[AppPath.catalog] },
  { ...breadcrumb[AppPath.cart] },
];

function CartPage(): JSX.Element {
  const cartItems = useSelector(getCartItems);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const discount = useSelector(getDiscount);
  const shouldHighlightDiscount = Boolean(totalCartPrice) && discount.size !== 0;

  return (
    <MainLayout>
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <Breadcrumbs routes={breadcrumbs} />
      <div className="cart">
        <CartProductList cartItems={cartItems} />
        <div className="cart__footer">
          <Coupon discount={discount} />
          <CartTotalInfo
            cartItems={cartItems}
            totalCartPrice={totalCartPrice}
            discount={discount}
            shouldHighlightDiscount={shouldHighlightDiscount}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default CartPage;
