import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const';

export default function Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Catalog}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
      </li>
    </ul>
  );
}
