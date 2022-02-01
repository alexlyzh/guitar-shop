import {Link} from 'react-router-dom';
import {AppPath} from '../../const';
import SearchForm from './search-form/search-form';
import Logo from '../common/logo/logo';
import {useSearch} from '../../hooks/use-search/use-search';

function Header(): JSX.Element {
  const {search, changeSearch, isDropdownVisible, foundGuitars} = useSearch();
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container header__wrapper">
        <Logo />

        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className="link main-nav__link link--current" to={AppPath.catalog}>Каталог</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">Где купить?</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchForm
          search={search}
          onInputChange={changeSearch}
          isDropdownVisible={isDropdownVisible}
          foundGuitars={foundGuitars}
        />

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
