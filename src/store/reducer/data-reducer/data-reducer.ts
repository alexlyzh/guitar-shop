import {createReducer} from '@reduxjs/toolkit';
import {Guitar, RequestedData, RequestStatus} from '../../../types/types';
import {ActionCreator} from '../../actions';

type State = {
  guitars: RequestedData<Guitar>,
}

const initialState: State = {
  guitars: {
    requestStatus: RequestStatus.IDLE,
    data: [],
  },
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.startLoadGuitars, (state, action) => {
      state.guitars = {
        requestStatus: RequestStatus.PENDING,
        data: [],
      };
    })
    .addCase(ActionCreator.saveGuitars, (state, action) => {
      state.guitars = {
        requestStatus: RequestStatus.SUCCESS,
        data: action.payload,
      };
    })
    .addCase(ActionCreator.setErrorLoadGuitars, (state, action) => {
      state.guitars = {
        requestStatus: RequestStatus.ERROR,
        data: [],
      };
    });
});

