import FilterContainer from './filter/filter-container';
import {MIN_CATALOG_HEIGHT, GUITARS_PER_PAGE, AppMessage} from '../../const';
import MainLayout from '../main-layout/main-layout';
import Spinner from '../common/spinner/spinner';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import Sort from './sort/sort';
import Cards from './cards/cards';
import Pagination from './pagination/pagination';
import {usePagination} from '../../hooks/use-pagination/use-pagination';
import {useParams} from 'react-router-dom';
import {useAllGuitars} from '../../hooks/use-all-guitars/use-all-guitars';
import {useSort} from '../../hooks/use-sort/use-sort';

type PageParams = {
  id: string,
}

function CatalogPage(): JSX.Element {
  const params = useParams<PageParams>();
  const pageNumber = Number(params.id);

  const {guitars, isFetchingGuitars, isErrorLoadingGuitars} = useAllGuitars();
  const {currentSort, changeSort} = useSort();

  const {
    currentPage,
    renderGuitars,
  } = usePagination(guitars, pageNumber, GUITARS_PER_PAGE);

  if (isErrorLoadingGuitars) {
    return (
      <MainLayout>
        <Breadcrumbs />
        <p style={{display: 'flex', justifyContent: 'center'}}>
          {AppMessage.ErrorOnGetAllGuitars}
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="page-content__title title title--bigger">{AppMessage.CatalogPageHeading}</h1>
      <Breadcrumbs />

      <div className="catalog" style={{minHeight: MIN_CATALOG_HEIGHT}}>
        <FilterContainer />
        {isFetchingGuitars ? <Spinner /> :
          <>
            <Sort
              isDisabled={!guitars.data.length}
              currentSort={currentSort}
              onSortOptionClick={changeSort}
            />
            <Cards guitars={renderGuitars} />
            <Pagination
              totalCards={guitars.data.length}
              currentPage={currentPage}
              guitarsPerPage={GUITARS_PER_PAGE}
            />
          </>}
      </div>
    </MainLayout>
  );
}

export default CatalogPage;
