import {Link} from 'react-router-dom';
import {useState} from 'react';
import {FIRST_PAGE, GUITARS_PER_PAGE} from '../../../const';

const PAGES_LIMIT = 3;
const PAGES_STEP = 2;

type Props = {
  totalCards: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void,
}

function Pagination({totalCards, currentPage, onPageChange}: Props): JSX.Element | null {
  const lastPage = Math.ceil(totalCards / GUITARS_PER_PAGE);
  const [lastVisiblePage, setLastVisiblePage] = useState(Math.min(currentPage + PAGES_STEP, lastPage));

  if (totalCards < GUITARS_PER_PAGE) {
    return null;
  }

  const pages: number[] = [];
  for (let i = lastVisiblePage; (i > 0) && (pages.length < PAGES_LIMIT); i--) {
    pages.unshift(i);
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {(lastVisiblePage - PAGES_STEP) > FIRST_PAGE ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link className="link pagination__page-link" to="#"
              onClick={() => {
                const update = Math.max(lastVisiblePage - PAGES_STEP, FIRST_PAGE + PAGES_STEP);
                setLastVisiblePage(update);
              }}
            >
              Назад
            </Link>
          </li> : null}
        {pages.map((page) => (
          <li className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`} key={page}>
            <Link className="link pagination__page-link" to="#"
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </Link>
          </li>
        ))}
        {lastVisiblePage < lastPage ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#"
              onClick={() => {
                const update = Math.min(lastVisiblePage + PAGES_STEP, lastPage);
                setLastVisiblePage(update);
              }}
            >
              Далее
            </Link>
          </li> : null}
      </ul>
    </div>
  );
}

export default Pagination;
