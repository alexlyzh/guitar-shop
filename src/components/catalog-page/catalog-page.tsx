import {useDispatch, useSelector} from 'react-redux';
import {RequestStatus} from '../../types/types';
import {getGuitars} from '../../store/reducer/data-reducer/selectors';
import Filter from './filter/filter';
import {MIN_CATALOG_HEIGHT, GUITARS_PER_PAGE} from '../../const';
import {getCurrentSort} from '../../store/reducer/sort-reducer/selectors';
import {SortSettings} from '../../store/reducer/sort-reducer/sort-reducer';
import {ActionAPI} from '../../store/api-actions/api-actions';
import MainLayout from '../main-layout/main-layout';
import Spinner from '../common/spinner/spinner';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import Sort from './sort/sort';
import Cards from './cards/cards';
import Pagination from './pagination/pagination';
import {useEffect} from 'react';
import {usePagination} from '../../hooks/use-pagination/use-pagination';
import {useParams} from 'react-router-dom';

type PageParams = {
  id: string,
}

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const params = useParams<PageParams>();
  const pageNumber = Number(params.id);

  const guitars = useSelector(getGuitars);
  const currentSort = useSelector(getCurrentSort);
  const shouldLoadGuitars = guitars.requestStatus === RequestStatus.IDLE;
  const isFetchingData = guitars.requestStatus === RequestStatus.PENDING;

  const {
    currentPage,
    renderGuitars,
  } = usePagination(guitars, pageNumber, GUITARS_PER_PAGE);

  const onSortOptionClick = (update: SortSettings) => {
    dispatch(ActionAPI.updateSort(update));
  };

  useEffect(() => {
    if (shouldLoadGuitars) {
      dispatch(ActionAPI.getAllGuitars());
    }
  }, [shouldLoadGuitars, dispatch]);

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
            <Cards guitars={renderGuitars} />
            <Pagination
              totalCards={guitars.data.length}
              currentPage={currentPage}
            />
          </>}
      </div>
    </MainLayout>
  );
}

export default CatalogPage;
