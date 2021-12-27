import {ThunkAction} from 'redux-thunk';
import {Guitar} from '../types/types';
import {AxiosInstance} from 'axios';
import {Action} from '@reduxjs/toolkit';
import {apiRoute} from '../const';
import {ActionCreator} from './actions';
import {State} from './reducer/root-reducer';
import {Dispatch, SetStateAction} from 'react';
import {Sorting} from './reducer/app-reducer/app-reducer';
import {BASE_URL} from '../api';
import {toast} from 'react-toastify';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

const APIAction = {
  getGuitars: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(apiRoute.path.guitars);
        dispatch(ActionCreator.saveGuitars(data));
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

  sortGuitars: (sort: Sorting): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      try {
        if (!sort.type || !sort.order) {
          await Promise.reject(Error('Недостаточно данных для сортировки'));
          return;
        }
        const url = new URL(apiRoute.path.guitars, BASE_URL);
        url.searchParams.append(apiRoute.search.sort, sort.type);
        url.searchParams.append(apiRoute.search.order, sort.order);
        const {data} = await api.get<Guitar[]>(url.href);
        dispatch(ActionCreator.changeSort(sort));
        dispatch(ActionCreator.saveGuitars(data));
      } catch(e) {
        toast.error('Сортировка сорвалась =/');
        throw e;
      }
    },
};

export {APIAction};
