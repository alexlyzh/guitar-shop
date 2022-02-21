import Logo from '../common/logo/logo';
import SearchForm from './search-form/search-form';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../../hooks/use-search/use-search';
import { AppPath } from '../../const/app-routes';
import CartLink from './cart-link/cart-link';

function Header(): JSX.Element {
  const location = useLocation();
  const {search, changeSearch, isDropdownVisible, foundGuitars} = useSearch();
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container header__wrapper">
        <Logo />

        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link className={`link main-nav__link ${location.pathname === AppPath.catalog ? 'link--current' : ''}`} to={AppPath.catalog}>Каталог</Link>
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
        <CartLink />

      </div>
    </header>
  );
}

export default Header;
