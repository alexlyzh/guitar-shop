import { SiteRoute } from '../../../types/types';
import { Link } from 'react-router-dom';

type Props = {
  routes: SiteRoute[],
}

export default function Breadcrumbs({routes}: Props): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
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
