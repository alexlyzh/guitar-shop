import {Link} from 'react-router-dom';
import {AppPath} from '../../../const';

function Logo(): JSX.Element {
  return (
    <Link className="header__logo logo" to={AppPath.root}>
      <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
    </Link>
  );
}

export default Logo;
