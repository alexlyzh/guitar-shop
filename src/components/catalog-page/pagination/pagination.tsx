import {Link} from 'react-router-dom';
import {FIRST_PAGE, GUITARS_PER_PAGE} from '../../../const';

type Props = {
  totalCards: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void,
}

function Pagination({totalCards, currentPage, onPageChange}: Props): JSX.Element | null {
  const lastPage = Math.ceil(totalCards / GUITARS_PER_PAGE);

  if (totalCards < GUITARS_PER_PAGE) {
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
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link className="link pagination__page-link" to="#"
              onClick={() => {
                onPageChange(currentPage - 1);
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
        {currentPage < lastPage ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#"
              onClick={() => {
                onPageChange(currentPage + 1);
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
