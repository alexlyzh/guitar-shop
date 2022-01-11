import {useState} from 'react';
import {Guitar} from '../types/types';
import {FIRST_PAGE} from '../const';

export const usePagination = (guitars: Guitar[], startPage: number | string, guitarsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(Number(startPage));
  const lastGuitarIndex = currentPage * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;
  const renderGuitars = guitars.slice(firstGuitarIndex, lastGuitarIndex);
  const shouldResetPagination = (currentPage * guitarsPerPage) > (Math.ceil(guitars.length / guitarsPerPage) * guitarsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const resetPagination = () => setCurrentPage(FIRST_PAGE);

  return {
    currentPage,
    paginate,
    renderGuitars,
    shouldResetPagination,
    resetPagination,
  };
};
