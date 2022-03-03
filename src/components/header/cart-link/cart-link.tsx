import { Link } from 'react-router-dom';
import { AppPath } from '../../../const/app-routes';
import { useSelector } from 'react-redux';
import { getTotalCartCount } from '../../../store/reducer/cart-reducer/selectors';

function CartLink(): JSX.Element {
  const totalCartCount = useSelector(getTotalCartCount);
  return (
    <Link className="header__cart-link" to={AppPath.cart} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket"/>
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>
      {totalCartCount ? <span className="header__cart-count" aria-label="items in cart">{totalCartCount}</span> : null}
    </Link>
  );
}

export default CartLink;
