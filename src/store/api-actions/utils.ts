import {SortSettings, SortState} from '../reducer/sort-reducer/sort-reducer';
import {FilterSettings, FilterState} from '../reducer/filter-reducer/filter-reducer';
import {apiRoute, initialSort, stringCount} from '../../const';
import {BASE_URL} from '../../api';
import {Guitar} from '../../types/types';
import {Action, CombinedState, ThunkDispatch} from '@reduxjs/toolkit';
import {DataState} from '../reducer/data-reducer/data-reducer';
import {AxiosInstance} from 'axios';
import {ActionCreator, ActionType} from '../actions';

export const parseGuitarsData = (guitars: Guitar[]) => {
  let minPrice = 0;
  let maxPrice = 0;
  guitars.forEach((guitar) => {
    minPrice = minPrice === 0 ? guitar.price : Math.min(minPrice, guitar.price);
    maxPrice = Math.max(maxPrice, guitar.price);
  });
  return {minPrice, maxPrice};
};


export const prepareSortAction = (currentSort: SortSettings, update: SortSettings) => {
  if (!currentSort.type && !currentSort.order) {
    return {...initialSort, ...update};
  }
  return {...currentSort, ...update};
};


export const createGuitarsUrl = (filter: FilterSettings, sort: SortSettings) => {
  const url = new URL(apiRoute.path.guitars, BASE_URL);

  filter.priceMin && url.searchParams.append(apiRoute.search.priceMin, filter.priceMin.toString());
  filter.priceMax && url.searchParams.append(apiRoute.search.priceMax, filter.priceMax.toString());
  filter.strings.length && filter.strings.forEach((string) => {
    url.searchParams.append(apiRoute.search.stringCount, string.toString());
  });
  filter.types.length && filter.types.forEach((type) => {
    url.searchParams.append(apiRoute.search.type, type);
  });

  sort.type && url.searchParams.append(apiRoute.search.sort, sort.type);
  sort.order && url.searchParams.append(apiRoute.search.order, sort.order);

  return url;
};

export const checkStringsFilter = (
  dispatch: ThunkDispatch<CombinedState<{ DATA: DataState, SORT: SortState, FILTER: FilterState }>,
    AxiosInstance,
    Action<ActionType>>,
  currentFilter: FilterSettings,
  type: string,
) => {
  currentFilter.strings.forEach((string) => {
    if (!stringCount[type].includes(string)) {
      dispatch(ActionCreator.toggleStringCondition(string));
    }
  });
};
