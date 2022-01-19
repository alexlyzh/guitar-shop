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
) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(getCurrentFilter);
  const {page: currentPage} = currentFilter;

  const lastGuitarIndex = currentFilter.page * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;
  const renderGuitars = guitars.data.slice(firstGuitarIndex, lastGuitarIndex);
  const shouldResetPagination = guitars.requestStatus === RequestStatus.SUCCESS
    && (currentFilter.page * guitarsPerPage) > (Math.ceil(guitars.data.length / guitarsPerPage) * guitarsPerPage);

  const paginate = useCallback((page: number) => {
    dispatch(ActionCreator.setCatalogPage(page));

    const newFilter = {...currentFilter, page};
    const link = createCatalogAppUrl({...currentFilter, page}).search;
    console.log('____________________________________') // eslint-disable-line
    console.log('PAGINATION') // eslint-disable-line
    console.log(newFilter) // eslint-disable-line
    console.log(link) // eslint-disable-line
    console.log('____________________________________') // eslint-disable-line
    dispatch(ActionCreator.updateFilterUrl(link));
  }, [dispatch]);


  useEffect(() => {
    if (shouldResetPagination) {
      paginate(FIRST_PAGE);
    }
  }, [shouldResetPagination, paginate]);

  useEffect(() => {
    paginate(currentPage);
  }, [currentPage, paginate]);

  return {
    currentPage,
    renderGuitars,
    shouldResetPagination,
    paginate,
  };
};
