import {ThunkAction} from 'redux-thunk';
import {Guitar} from '../../types/types';
import {AxiosInstance} from 'axios';
import {Action} from '@reduxjs/toolkit';
import {apiRoute} from '../../const';
import {ActionCreator} from '../actions';
import {State} from '../reducer/root-reducer';
import {Dispatch, SetStateAction} from 'react';
import {BASE_URL} from '../../api';
import {SortSettings} from '../reducer/sort-reducer/sort-reducer';
import {createGuitarsUrl, mapGuitarsData, prepareSortAction} from './utils';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

const ActionAPI = {
  getAllGuitars: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(apiRoute.path.guitars);
        const {minPrice, maxPrice} = mapGuitarsData(data);
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
      const state = getState();
      const {currentFilter} = state.FILTER;
      const {currentSort} = state.SORT;
      const sort = prepareSortAction(currentSort, update);
      const url = createGuitarsUrl(currentFilter, sort);
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(url.href);
        dispatch(ActionCreator.changeSort(sort));
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  updateFilter: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      const state = getState();
      const {currentFilter} = state.FILTER;
      const {currentSort} = state.SORT;
      const url = createGuitarsUrl(currentFilter, currentSort);
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

export {ActionAPI};
