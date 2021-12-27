import {initialSort, SortOrder, SortType} from '../../../const';
import {Sorting} from '../../../store/reducer/app-reducer/app-reducer';

export const getSortTypeBtnClassName = (
  currentSort: Sorting,
  target: SortType,
) => currentSort.type === target ? 'catalog-sort__type-button--active' : '';

export const getSortOrderBtnClassName = (
  currentSort: Sorting,
  target: SortOrder,
) => currentSort.order === target ? 'catalog-sort__order-button--active' : '';

export const preProcessSortAction = (currentSort: Sorting, update: Sorting) => {
  if (!currentSort.type && ! currentSort.order) {
    return {...initialSort, ...update};
  }
  return {...currentSort, ...update};
};
