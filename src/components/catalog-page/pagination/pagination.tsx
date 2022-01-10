import {Link} from 'react-router-dom';
import {useState} from 'react';
import {FIRST_PAGE, GUITARS_PER_PAGE} from '../../../const';

const ADDITIONAL_PAGES = 2;

type Props = {
  totalCards: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void,
}

function Pagination({totalCards, currentPage, onPageChange}: Props): JSX.Element | null {
  const lastPage = Math.ceil(totalCards / GUITARS_PER_PAGE);
  const [lastVisiblePage, setLastVisiblePage] = useState(currentPage + ADDITIONAL_PAGES);

  const pageLinks: number[] = [lastVisiblePage - 2, lastVisiblePage - 1, lastVisiblePage];

  if (totalCards < GUITARS_PER_PAGE) {
    return null;
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {(lastVisiblePage - ADDITIONAL_PAGES) !== FIRST_PAGE ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link className="link pagination__page-link" to="#"
              onClick={() => {
                const update = Math.max(lastVisiblePage - ADDITIONAL_PAGES, FIRST_PAGE + ADDITIONAL_PAGES);
                setLastVisiblePage(update);
              }}
            >
              Назад
            </Link>
          </li> : null}
        {pageLinks.map((pageNumber) => (
          <li className={`pagination__page ${currentPage === pageNumber ? 'pagination__page--active' : ''}`} key={pageNumber}>
            <Link className="link pagination__page-link" to="#"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        {lastVisiblePage !== lastPage ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#"
              onClick={() => {
                const update = Math.min(lastVisiblePage + ADDITIONAL_PAGES, lastPage);
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
