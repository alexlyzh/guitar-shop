import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarWithComments, RemoteData, RequestStatus } from '../../types/types';
import { FIRST_PAGE } from '../../const/common';
import { getCurrentFilter } from '../../store/reducer/filter-reducer/selectors';
import { ActionCreator } from '../../store/actions';
import { createCatalogAppUrl } from '../../utils/api';
import { AppPath } from '../../const/app-routes';

export const usePagination = (
  guitars: RemoteData<GuitarWithComments>,
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
    const redirectPage = page ? page : currentPage;
    dispatch(ActionCreator.setCatalogPage(redirectPage));
    const search = createCatalogAppUrl({...currentFilter, page: redirectPage}).search;
    dispatch(ActionCreator.updateCatalogUrl(`${AppPath.catalog}${search}`));
  }, [currentFilter, currentPage, dispatch]);

  useEffect(() => {
    if (shouldResetPagination) {
      paginate(FIRST_PAGE);
    }
  }, [shouldResetPagination, paginate]);

  useEffect(() => {
    if (currentPage) {
      paginate(currentPage);
    }
  }, [currentPage, paginate]);

  return {
    currentPage,
    renderGuitars,
    shouldResetPagination,
    paginate,
  };
};
