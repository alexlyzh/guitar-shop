import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import SearchForm from './search-form/search-form';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Root}>
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className="link main-nav__link link--current" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">Где купить?</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchForm />

        <Link className="header__cart-link" to="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"/>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
