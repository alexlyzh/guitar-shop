import FilterContainer from './filter/filter-container';
import MainLayout from '../main-layout/main-layout';
import Spinner from '../common/spinner/spinner';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import Sort from './sort/sort';
import Cards from './cards/cards';
import Pagination from './pagination/pagination';
import { MIN_CATALOG_HEIGHT, GUITARS_PER_PAGE, AppMessage } from '../../const';
import { usePagination } from '../../hooks/use-pagination/use-pagination';
import { useSort } from '../../hooks/use-sort/use-sort';
import { useCatalogUrl } from '../../hooks/use-catalog-url/use-catalog-url';
import { useGuitars } from '../../hooks/use-guitars/use-guitars';
import { getBreadcrumbRoutes } from '../../utils/common';

function CatalogPage(): JSX.Element {
  const isCatalogInitialized = useCatalogUrl();
  const {guitars, isFetchingGuitars, isErrorLoadingGuitars} = useGuitars();
  const {currentPage, renderGuitars, paginate} = usePagination(guitars, GUITARS_PER_PAGE, isCatalogInitialized);
  const {
    currentSort,
    setTypePriceSort,
    setTypeRatingSort,
    setDescendingOrderSort,
    setAscendingOrderSort,
  } = useSort();

  const routes = getBreadcrumbRoutes('Каталог');

  if (isErrorLoadingGuitars) {
    return (
      <MainLayout>
        <Breadcrumbs routes={routes} />
        <p style={{display: 'flex', justifyContent: 'center'}}>
          {AppMessage.ErrorOnGetGuitars}
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="page-content__title title title--bigger">{AppMessage.CatalogPageHeading}</h1>
      <Breadcrumbs routes={routes} />

      <div className="catalog" style={{minHeight: MIN_CATALOG_HEIGHT}}>
        <FilterContainer />
        <Sort
          isDisabled={!isCatalogInitialized || !guitars.data.length}
          currentSort={currentSort}
          onAscendingOrderClick={setAscendingOrderSort}
          onDescendingOrderClick={setDescendingOrderSort}
          onTypePriceClick={setTypePriceSort}
          onTypeRatingClick={setTypeRatingSort}
        />
        {(isFetchingGuitars || !isCatalogInitialized) ? <Spinner marginTop={'10em'} /> :
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
