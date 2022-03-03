import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../../types/types';

type Props = {
  routes: Breadcrumb[],
}

export default function Breadcrumbs({routes}: Props): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs" aria-label="breadcrumbs">
      {routes.map(({pathname, title}) => (
        <li className="breadcrumbs__item" key={pathname}>
          <Link className="link" to={pathname}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
