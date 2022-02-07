import { ThunkAction } from 'redux-thunk';
import { Comment, CommentPost, Guitar } from '../../types/types';
import { AxiosInstance } from 'axios';
import { Action } from '@reduxjs/toolkit';
import { apiRoute, AppMessage, AppPath, AppSearchParam } from '../../const';
import { ActionCreator } from '../actions';
import { State } from '../reducer/root-reducer';
import { Dispatch, SetStateAction } from 'react';
import { BASE_API_URL } from '../../api';
import { SortSettings } from '../reducer/sort-reducer/sort-reducer';
import { generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';
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

  postComment: (comment: CommentPost, onSuccess?: () => void): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.setSubmitting(true));
      try {
        const {data} = await api.post<Comment>(apiRoute.path.comments, {...comment});
        dispatch(ActionCreator.addComment(comment.guitarId, data));
        onSuccess && onSuccess();
      } catch (e) {
        toast.info(AppMessage.ErrorPostingReview);
        throw e;
      }
      finally {
        dispatch(ActionCreator.setSubmitting(false));
      }
    },

  searchGuitars: (template: string, setFoundGuitars: Dispatch<SetStateAction<Guitar[]>>): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
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
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(apiRoute.path.guitars);
        const {minPrice, maxPrice} = parseGuitarsData(data);
        dispatch(ActionCreator.setPriceRange(minPrice, maxPrice));
        dispatch(ActionCreator.initializeCatalog());
      } catch (e) {
        toast.error(AppMessage.ErrorOnGetGuitars);
        throw e;
      }
    },

  updateFilter: (): ThunkActionResult =>
    async (dispatch, getState, _api): Promise<void> => {
      const state = getState();
      const filter = checkStringsFilter(state.FILTER.currentFilter);
      dispatch(ActionCreator.updateFilterUrl(
        `${AppPath.catalog}?${createCatalogAppUrl(filter).search.toString()}`,
      ));
      const sort = state.SORT.currentSort;
      const params = new URLSearchParams(createCatalogApiUrl(filter, sort).search);
      await dispatch(ActionAPI.getGuitars(params));
    },

  getGuitars: (searchParams: URLSearchParams): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      searchParams.delete(AppSearchParam.page);
      try {
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
};

export { ActionAPI };
