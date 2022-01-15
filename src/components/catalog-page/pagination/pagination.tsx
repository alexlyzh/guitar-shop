import {generatePath, Link} from 'react-router-dom';
import {FIRST_PAGE, AppRoute} from '../../../const';

type Props = {
  totalCards: number,
  currentPage: number,
  guitarsPerPage: number,
}

function Pagination({totalCards, currentPage, guitarsPerPage}: Props): JSX.Element | null {
  const lastPage = Math.ceil(totalCards / guitarsPerPage);

  if (totalCards <= guitarsPerPage) {
    return null;
  }

  const pages: number[] = [];
  for (let i = FIRST_PAGE; i <= lastPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage > FIRST_PAGE ?
          <li className="pagination__page pagination__page--prev" id="prev"
            data-testid={'paginate-prev'}
          >
            <Link className="link pagination__page-link"
              to={generatePath(AppRoute.CatalogPage, {id: currentPage - 1})}
            >
              Назад
            </Link>
          </li> : null}
        {pages.map((page) => {
          const isActive = currentPage === page;
          return (
            <li className={`pagination__page ${isActive ? 'pagination__page--active' : ''}`} key={page}
              data-testid={isActive ? 'pagination-page-active' : 'pagination-page'}
            >
              <Link className="link pagination__page-link"
                to={generatePath(AppRoute.CatalogPage, {id: page})}
              >
                {page}
              </Link>
            </li>
          );
        })}
        {currentPage < lastPage ?
          <li className="pagination__page pagination__page--next" id="next"
            data-testid={'paginate-next'}
          >
            <Link className="link pagination__page-link"
              to={generatePath(AppRoute.CatalogPage, {id: currentPage + 1})}
            >
              Далее
            </Link>
          </li> : null}
      </ul>
    </div>
  );
}

export default Pagination;
