import MainLayout from '../main-layout/main-layout';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../common/spinner/spinner';
import {RequestStatus} from '../../types/types';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import {getGuitars} from '../../store/reducer/data-reducer/selectors';
import Filter from './filter/filter';
import {MIN_CATALOG_HEIGHT} from '../../const';
import {getCurrentSort} from '../../store/reducer/sort-reducer/selectors';
import {SortSettings} from '../../store/reducer/sort-reducer/sort-reducer';
import {ActionAPI} from '../../store/api-actions/api-actions';
import Sort from './sort/sort';
import Cards from './cards/cards';
import Pagination from './pagination/pagination';

const CARDS_PER_PAGE = 6;

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const guitars = useSelector(getGuitars);
  const currentSort = useSelector(getCurrentSort);
  const isFetchingData = guitars.requestStatus === RequestStatus.PENDING;

  const onSortOptionClick = (update: SortSettings) => {
    dispatch(ActionAPI.updateSort(update));
  };

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

            <Cards guitars={guitars.data} />

            {guitars.data.length > CARDS_PER_PAGE ? <Pagination /> : null}
          </>}
      </div>
    </MainLayout>
  );
}

export default CatalogPage;
