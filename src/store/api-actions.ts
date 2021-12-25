import {ThunkAction} from 'redux-thunk';
import {Guitar} from '../types/types';
import {AxiosInstance} from 'axios';
import {Action} from '@reduxjs/toolkit';
import {ApiRoute} from '../const';
import {ActionCreator} from './actions';
import {State} from './reducer/reducer';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

const APIAction = {
  getGuitars: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadGuitars());
      try {
        const {data} = await api.get<Guitar[]>(ApiRoute.GetGuitars);
        console.log(data); // eslint-disable-line
        dispatch(ActionCreator.saveGuitars(data));
      } catch (e) {
        dispatch(ActionCreator.setErrorLoadGuitars());
        throw e;
      }
    },
};

export {APIAction};
