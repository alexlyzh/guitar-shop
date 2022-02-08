import { ThunkAction } from 'redux-thunk';
import { Comment, CommentPost, Guitar, GuitarWithComments } from '../../types/types';
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
  embedComments,
  parseGuitarsData,
  prepareSortAction,
  sortByNameStartingWithTemplate
} from '../../utils/api';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

const ActionAPI = {
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
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const url = createCatalogApiUrl(currentFilter, sort);
        embedComments(url.searchParams);
        const {data} = await api.get<GuitarWithComments[]>(url.href);
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  getGuitarsPriceRange: (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
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
      dispatch(ActionCreator.updateCatalogUrl(`${AppPath.catalog}${createCatalogAppUrl(filter).search}`));
      const sort = state.SORT.currentSort;
      const params = new URLSearchParams(createCatalogApiUrl(filter, sort).search);
      await dispatch(ActionAPI.getGuitars(embedComments(params)));
    },

  getGuitars: (searchParams: URLSearchParams): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      searchParams.delete(AppSearchParam.page);
      try {
        const endpoint = `${apiRoute.path.guitars}?${searchParams.toString()}`;
        const {data} = await api.get<GuitarWithComments[]>(endpoint);
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },

  getGuitarWithCommentsById: (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const params = new URLSearchParams();
        const endpoint = `${generatePath(apiRoute.path.guitar, {id})}?${embedComments(params)}`;
        const {data} = await api.get<GuitarWithComments>(endpoint);
        dispatch(ActionCreator.saveGuitar(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },
};

export { ActionAPI };
