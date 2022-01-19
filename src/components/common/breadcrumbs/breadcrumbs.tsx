import {Link} from 'react-router-dom';
import {AppPath} from '../../../const';

export default function Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppPath.Main}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppPath.Catalog}>Каталог</Link>
      </li>
    </ul>
  );
}
