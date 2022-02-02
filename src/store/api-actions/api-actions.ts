import { ThunkAction } from 'redux-thunk';
import { Comment, Guitar } from '../../types/types';
import { AxiosInstance } from 'axios';
import { Action } from '@reduxjs/toolkit';
import { apiRoute, AppPath, AppSearchParam } from '../../const';
import { ActionCreator } from '../actions';
import { State } from '../reducer/root-reducer';
import { Dispatch, SetStateAction } from 'react';
import { BASE_API_URL } from '../../api';
import { SortSettings } from '../reducer/sort-reducer/sort-reducer';
import { generatePath } from 'react-router-dom';
import {
  checkStringsFilter,
  createCatalogApiUrl,
  createCatalogAppUrl,
  parseGuitarsData,
  prepareSortAction,
  sortByNameStartingWithTemplate
} from './utils';


type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

const ActionAPI = {
  getComments: (guitarId: number): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadComments(guitarId));
      try {
        const {data} = await api.get<Comment[]>(generatePath(apiRoute.path.guitarComments, {id: guitarId}));
        dispatch(ActionCreator.saveComments(guitarId, data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadComments(guitarId));
        throw e;
      }
    },

  searchGuitars: (template: string, setFoundGuitars: Dispatch<SetStateAction<Guitar[]>>): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      try {
        const url = new URL(apiRoute.path.guitars, BASE_API_URL);
        url.searchParams.append(apiRoute.search.name, template);
        const {data} = await api.get<Guitar[]>(url.href);
        setFoundGuitars(sortByNameStartingWithTemplate(data, template));
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
      dispatch(ActionCreator.setSort(sort));
      const url = createCatalogApiUrl(currentFilter, sort);
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(url.href);
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  getGuitarsPriceRange: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      const {data} = await api.get<Guitar[]>(apiRoute.path.guitars);
      const {minPrice, maxPrice} = parseGuitarsData(data);
      dispatch(ActionCreator.setPriceRange(minPrice, maxPrice));
    },

  getGuitars: (searchParams: URLSearchParams): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      dispatch(ActionCreator.updateFilterUrl(`${AppPath.catalog}?${searchParams.toString()}`));
      try {
        searchParams.delete(AppSearchParam.page);
        const {data} = await api.get<Guitar[]>(`${apiRoute.path.guitars}?${searchParams.toString()}`);
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  getGuitarById: (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar>(generatePath(apiRoute.path.guitar, {id}));
        dispatch(ActionCreator.saveGuitar(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  updateFilter: (): ThunkActionResult =>
    async (dispatch, getState, _api): Promise<void> => {
      const state = getState();
      const filter = checkStringsFilter(state.FILTER.currentFilter);
      const params = new URLSearchParams(createCatalogAppUrl(filter).search);
      await dispatch(ActionAPI.getGuitars(params));
    },
};

export { ActionAPI };
