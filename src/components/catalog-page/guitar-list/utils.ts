import {SortOrder, SortType} from '../../../const';
import {SortSettings} from '../../../store/reducer/sort-reducer/sort-reducer';

export const getSortTypeBtnClassName = (
  currentSort: SortSettings,
  target: SortType,
) => currentSort.type === target ? 'catalog-sort__type-button--active' : '';

export const getSortOrderBtnClassName = (
  currentSort: SortSettings,
  target: SortOrder,
) => currentSort.order === target ? 'catalog-sort__order-button--active' : '';
