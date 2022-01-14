import {useCallback, useEffect, useState} from 'react';
import {Guitar, RemoteData, RequestStatus} from '../../types/types';
import {AppRoute, FIRST_PAGE} from '../../const';
import {generatePath, useHistory} from 'react-router-dom';

export const usePagination = (
  guitars: RemoteData<Guitar>,
  pageNumber: number,
  guitarsPerPage: number,
) => {
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const history = useHistory();

  const lastGuitarIndex = currentPage * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;
  const renderGuitars = guitars.data.slice(firstGuitarIndex, lastGuitarIndex);
  const shouldResetPagination = guitars.requestStatus === RequestStatus.SUCCESS
    && (currentPage * guitarsPerPage) > (Math.ceil(guitars.data.length / guitarsPerPage) * guitarsPerPage);

  const paginate = useCallback((page: number) => {
    history.push(generatePath(AppRoute.CatalogPage, {id: page}));
    setCurrentPage(page);
  }, [history]);

  useEffect(() => {
    if (shouldResetPagination) {
      paginate(FIRST_PAGE);
    }
  }, [shouldResetPagination, paginate]);

  useEffect(() => {
    paginate(pageNumber);
  }, [pageNumber, paginate]);

  return {
    currentPage,
    renderGuitars,
    shouldResetPagination,
    paginate,
  };
};
