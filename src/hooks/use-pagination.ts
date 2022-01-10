import {useState} from 'react';
import {Guitar} from '../types/types';

export const usePagination = (guitars: Guitar[], firstPage: number, guitarsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(firstPage);
  const lastGuitarIndex = currentPage * guitarsPerPage;
  const firstGuitarIndex = lastGuitarIndex - guitarsPerPage;
  const renderGuitars = guitars.slice(firstGuitarIndex, lastGuitarIndex);
  const shouldResetPagination = (currentPage * guitarsPerPage) > (Math.ceil(guitars.length / guitarsPerPage) * guitarsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const resetPagination = () => setCurrentPage(firstPage);

  return {
    currentPage,
    paginate,
    renderGuitars,
    shouldResetPagination,
    resetPagination,
  };
};
