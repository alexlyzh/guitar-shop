import {ThunkAction} from 'redux-thunk';
import {Guitar} from '../types/types';
import {AxiosInstance} from 'axios';
import {Action} from '@reduxjs/toolkit';
import {apiRoute, initialSort} from '../const';
import {ActionCreator} from './actions';
import {State} from './reducer/root-reducer';
import {Dispatch, SetStateAction} from 'react';
import {BASE_URL} from '../api';
import {FilterSettings, SortSettings} from './reducer/data-reducer/data-reducer';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

const prepareSortAction = (currentSort: SortSettings, update: SortSettings) => {
  if (!currentSort.type && ! currentSort.order) {
    return {...initialSort, ...update};
  }
  return {...currentSort, ...update};
};

const APIAction = {
  getGuitars: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      let minPrice = 0;
      let maxPrice = 0;
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(apiRoute.path.guitars);
        data.forEach((guitar) => {
          minPrice = minPrice === 0 ? guitar.price : Math.min(minPrice, guitar.price);
          maxPrice = Math.max(maxPrice, guitar.price);
        });
        dispatch(ActionCreator.saveGuitars(data));
        dispatch(ActionCreator.setPriceRange(minPrice, maxPrice));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  searchGuitars: (name: string, setFoundGuitars: Dispatch<SetStateAction<Guitar[]>>): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      if (!name) {
        return;
      }
      try {
        const url = new URL(apiRoute.path.guitars, BASE_URL);
        url.searchParams.append(apiRoute.search.nameLike, name);
        const {data} = await api.get<Guitar[]>(url.href);
        setFoundGuitars(data);
      } catch (e) {
        setFoundGuitars([]);
        throw e;
      }
    },

  updateSort: (update: SortSettings): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      const newSort = prepareSortAction(getState().DATA.currentSort, update);
      dispatch(ActionCreator.startLoadGuitars());
      try {
        if (!newSort.type || !newSort.order) {
          await Promise.reject(Error('Недостаточно данных для сортировки'));
          return;
        }
        const url = new URL(apiRoute.path.guitars, BASE_URL);
        url.searchParams.append(apiRoute.search.sort, newSort.type);
        url.searchParams.append(apiRoute.search.order, newSort.order);
        const {data} = await api.get<Guitar[]>(url.href);
        dispatch(ActionCreator.changeSort(newSort));
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  updateFilter: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      const {currentFilter, currentSort} = getState().DATA;
      const url = createUrl(currentFilter, currentSort);
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(url.href);
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },
};

const createUrl = (filter: FilterSettings, sort: SortSettings) => {
  const url = new URL(apiRoute.path.guitars, BASE_URL);
  filter.priceMin && url.searchParams.append(apiRoute.search.priceMin, filter.priceMin.toString());
  filter.priceMax && url.searchParams.append(apiRoute.search.priceMax, filter.priceMax.toString());

  return url;
};

export {APIAction};
