import {FIRST_PAGE} from '../../../const';
import PaginationItem from './pagination-page/pagination-item';

type Props = {
  totalCards: number,
  currentPage: number,
  guitarsPerPage: number,
  paginate: (page: number) => void,
}

function Pagination({totalCards, currentPage, guitarsPerPage, paginate}: Props): JSX.Element | null {
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
          <PaginationItem
            className={'pagination__page pagination__page--prev'}
            linkText={'Назад'}
            onLinkClick={() => paginate(currentPage - 1)}
          />  : null}
        {pages.map((page) => {
          const isActive = currentPage === page;
          return (
            <PaginationItem
              className={`pagination__page ${isActive ? 'pagination__page--active' : ''}`}
              linkText={page}
              onLinkClick={() => paginate(page)}
              isActive={isActive}
              key={page}
            />
          );
        })}
        {currentPage < lastPage ?
          <PaginationItem
            className={'pagination__page pagination__page--next'}
            linkText={'Далее'}
            onLinkClick={() => paginate(currentPage + 1)}
          /> : null}
      </ul>
    </div>
  );
}

export default Pagination;
