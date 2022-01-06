import {createReducer} from '@reduxjs/toolkit';
import {Guitar, Price, RequestedData, RequestStatus} from '../../../types/types';
import {ActionCreator} from '../../actions';

type DataState = {
  guitars: RequestedData<Guitar>,
  priceRange: {
    min: Price,
    max: Price,
  }
}

const initialState: DataState = {
  guitars: {
    requestStatus: RequestStatus.IDLE,
    data: [],
  },
  priceRange: {
    min: null,
    max: null,
  },
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.startLoadGuitars, (state) => {
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
    .addCase(ActionCreator.setErrorLoadGuitars, (state) => {
      state.guitars = {
        requestStatus: RequestStatus.ERROR,
        data: [],
      };
    })
    .addCase(ActionCreator.setPriceRange, (state, action) => {
      state.priceRange = action.payload;
    });
});
