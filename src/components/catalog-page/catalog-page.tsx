import FilterContainer from './filter/filter-container';
import {MIN_CATALOG_HEIGHT, GUITARS_PER_PAGE, AppMessage} from '../../const';
import MainLayout from '../main-layout/main-layout';
import Spinner from '../common/spinner/spinner';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import Sort from './sort/sort';
import Cards from './cards/cards';
import Pagination from './pagination/pagination';
import {usePagination} from '../../hooks/use-pagination/use-pagination';
import {useSort} from '../../hooks/use-sort/use-sort';
import {useCatalogUrl} from '../../hooks/use-catalog-url/use-catalog-url';
import {useGuitars} from '../../hooks/use-guitars/use-guitars';

function CatalogPage(): JSX.Element {
  const isAppInitialized = useCatalogUrl();
  const {guitars, isFetchingGuitars, isErrorLoadingGuitars} = useGuitars();
  const {currentPage, renderGuitars, paginate} = usePagination(guitars, GUITARS_PER_PAGE, isAppInitialized);

  const {
    currentSort,
    setTypePriceSort,
    setTypeRatingSort,
    setDescendingOrderSort,
    setAscendingOrderSort,
  } = useSort();

  if (isErrorLoadingGuitars) {
    return (
      <MainLayout>
        <Breadcrumbs />
        <p style={{display: 'flex', justifyContent: 'center'}}>
          {AppMessage.ErrorOnGetGuitars}
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
        <Sort
          isDisabled={!isAppInitialized || !guitars.data.length}
          currentSort={currentSort}
          onAscendingOrderClick={setAscendingOrderSort}
          onDescendingOrderClick={setDescendingOrderSort}
          onTypePriceClick={setTypePriceSort}
          onTypeRatingClick={setTypeRatingSort}
        />
        {(isFetchingGuitars || !isAppInitialized) ? <Spinner /> :
          <>
            <Cards guitars={renderGuitars} />
            <Pagination
              totalCards={guitars.data.length}
              currentPage={currentPage}
              guitarsPerPage={GUITARS_PER_PAGE}
              paginate={paginate}
            />
          </>}
      </div>
    </MainLayout>
  );
}

export default CatalogPage;
