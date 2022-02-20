import './not-found-page.css';
import { Link } from 'react-router-dom';
import { AppPath } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="not-found">
      <h1>
        404 - <small>Страница не найдена</small>
      </h1>
      <Link className="link-to-main" to={AppPath.root}>
        На главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
