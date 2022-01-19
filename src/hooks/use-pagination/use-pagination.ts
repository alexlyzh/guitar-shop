import {useCallback, useEffect} from 'react';
import {Guitar, RemoteData, RequestStatus} from '../../types/types';
import {FIRST_PAGE} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentFilter} from '../../store/reducer/filter-reducer/selectors';
import {ActionCreator} from '../../store/actions';
import {createCatalogAppUrl} from '../../store/api-actions/utils';

export const usePagination = (
  guitars: RemoteData<Guitar>,
  guitarsPerPage: number,
  isAppInitialized: boolean,
) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(getCurrentFilter);
  const {page: currentPage} = currentFilter;

  const lastGuitarIndex = currentFilter.page * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;
  const renderGuitars = guitars.data.slice(firstGuitarIndex, lastGuitarIndex);
  const shouldResetPagination = isAppInitialized
    && guitars.requestStatus === RequestStatus.SUCCESS
    && (currentFilter.page * guitarsPerPage) > (Math.ceil(guitars.data.length / guitarsPerPage) * guitarsPerPage);

  const paginate = useCallback((page: number) => {
    dispatch(ActionCreator.setCatalogPage(page));
    dispatch(ActionCreator.updateFilterUrl(createCatalogAppUrl({...currentFilter, page}).search));
  }, [currentFilter, dispatch]);


  useEffect(() => {
    if (shouldResetPagination) {
      paginate(FIRST_PAGE);
    }
  }, [shouldResetPagination, paginate]);

  useEffect(() => {
    if (isAppInitialized) {
      console.log('paginate(currentPage)') // eslint-disable-line
      paginate(currentPage);
    }
  }, [isAppInitialized, currentPage, paginate]);

  return {
    currentPage,
    renderGuitars,
    shouldResetPagination,
    paginate,
  };
};
