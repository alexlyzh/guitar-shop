import {createReducer} from '@reduxjs/toolkit';
import {Guitar, RequestedData, RequestStatus} from '../../../types/types';
import {ActionCreator} from '../../actions';

type State = {
  renderGuitars: RequestedData<Guitar>,
}

const initialState: State = {
  renderGuitars: {
    requestStatus: RequestStatus.IDLE,
    data: [],
  },
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.startLoadGuitars, (state) => {
      state.renderGuitars = {
        requestStatus: RequestStatus.PENDING,
        data: [],
      };
    })
    .addCase(ActionCreator.saveRenderGuitars, (state, action) => {
      state.renderGuitars = {
        requestStatus: RequestStatus.SUCCESS,
        data: action.payload,
      };
    })
    .addCase(ActionCreator.setErrorLoadGuitars, (state) => {
      state.renderGuitars = {
        requestStatus: RequestStatus.ERROR,
        data: [],
      };
    });
});

