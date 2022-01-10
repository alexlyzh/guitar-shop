import MainLayout from '../main-layout/main-layout';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../common/spinner/spinner';
import {RequestStatus} from '../../types/types';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import {getGuitars} from '../../store/reducer/data-reducer/selectors';
import Filter from './filter/filter';
import {MIN_CATALOG_HEIGHT, FIRST_PAGE, GUITARS_PER_PAGE} from '../../const';
import {getCurrentSort} from '../../store/reducer/sort-reducer/selectors';
import {SortSettings} from '../../store/reducer/sort-reducer/sort-reducer';
import {ActionAPI} from '../../store/api-actions/api-actions';
import Sort from './sort/sort';
import Cards from './cards/cards';
import Pagination from './pagination/pagination';
import {useEffect, useState} from 'react';

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const guitars = useSelector(getGuitars);
  const currentSort = useSelector(getCurrentSort);
  const shouldLoadGuitars = guitars.requestStatus === RequestStatus.IDLE;
  const isFetchingData = guitars.requestStatus === RequestStatus.PENDING;

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const lastGuitarIndex = currentPage * GUITARS_PER_PAGE;
  const firstGuitarIndex = lastGuitarIndex - GUITARS_PER_PAGE;
  const renderedGuitars = guitars.data.slice(firstGuitarIndex, lastGuitarIndex);

  const onSortOptionClick = (update: SortSettings) => {
    dispatch(ActionAPI.updateSort(update));
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (shouldLoadGuitars) {
      dispatch(ActionAPI.getAllGuitars());
    }
  }, [shouldLoadGuitars, dispatch]);

  useEffect(() => {
    if (currentPage * GUITARS_PER_PAGE > guitars.data.length) {
      setCurrentPage(FIRST_PAGE);
    }
  }, [currentPage, guitars.data.length]);

  if (guitars.requestStatus === RequestStatus.ERROR) {
    return (
      <MainLayout>
        <Breadcrumbs />
        <p style={{display: 'flex', justifyContent: 'center'}}>
          Что-то сломалось, попробуйте перезагрузить страницу
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <Breadcrumbs />

      <div className="catalog" style={{minHeight: MIN_CATALOG_HEIGHT}}>
        <Filter />
        {isFetchingData ? <Spinner /> :
          <>
            <Sort
              isDisabled={!guitars.data.length}
              currentSort={currentSort}
              onSortOptionClick={onSortOptionClick}
            />
            <Cards guitars={renderedGuitars} />
            <Pagination
              totalCards={guitars.data.length}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </>}
      </div>
    </MainLayout>
  );
}

export default CatalogPage;
