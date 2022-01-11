import {useState} from 'react';
import {Guitar, RequestedData, RequestStatus} from '../../types/types';
import {AppRoute, FIRST_PAGE} from '../../const';
import {generatePath, useHistory} from 'react-router-dom';

export const usePagination = (
  guitars: RequestedData<Guitar>,
  startPage: number,
  guitarsPerPage: number,
) => {
  const [currentPage, setCurrentPage] = useState(startPage);
  const history = useHistory();

  const lastGuitarIndex = currentPage * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;
  const renderGuitars = guitars.data.slice(firstGuitarIndex, lastGuitarIndex);
  const shouldResetPagination = guitars.requestStatus === RequestStatus.SUCCESS
    && (currentPage * guitarsPerPage) > (Math.ceil(guitars.data.length / guitarsPerPage) * guitarsPerPage);

  const paginate = (pageNumber: number) => {
    history.push(generatePath(AppRoute.CatalogPage, {id: pageNumber}));
    setCurrentPage(pageNumber);
  };

  const resetPagination = () => paginate(FIRST_PAGE);

  return {
    currentPage,
    paginate,
    renderGuitars,
    shouldResetPagination,
    resetPagination,
  };
};
