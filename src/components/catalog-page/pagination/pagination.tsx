import PaginationItem from './pagination-item/pagination-item';
import { FIRST_PAGE } from '../../../const';

type Props = {
  totalCards: number,
  currentPage: number,
  guitarsPerPage: number,
  paginate: (page: number) => void,
}

function Pagination({totalCards, currentPage, guitarsPerPage, paginate}: Props): JSX.Element | null {
  if (totalCards <= guitarsPerPage) {
    return null;
  }

  const goNextPage = () => paginate(currentPage + 1);
  const goPrevPage = () => paginate(currentPage - 1);
  const lastPage = Math.ceil(totalCards / guitarsPerPage);

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
            onLinkClick={goPrevPage}
          />  : null}
        {pages.map((page) => {
          const isActive = currentPage === page;
          const goToPage = () => paginate(page);
          return (
            <PaginationItem
              className={`pagination__page ${isActive ? 'pagination__page--active' : ''}`}
              linkText={page}
              onLinkClick={goToPage}
              isActive={isActive}
              isPage
              key={page}
            />
          );
        })}
        {currentPage < lastPage ?
          <PaginationItem
            className={'pagination__page pagination__page--next'}
            linkText={'Далее'}
            onLinkClick={goNextPage}
          /> : null}
      </ul>
    </div>
  );
}

export default Pagination;
