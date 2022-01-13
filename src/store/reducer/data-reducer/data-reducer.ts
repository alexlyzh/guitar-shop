import {createReducer} from '@reduxjs/toolkit';
import {Comment, Guitar, Price, RemoteData, RemoteDataByID, RequestStatus} from '../../../types/types';
import {ActionCreator} from '../../actions';

type DataState = {
  guitars: RemoteData<Guitar>,
  comments: RemoteDataByID<Comment>,
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
  comments: {},
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
    .addCase(ActionCreator.startLoadComments, (state, action) => {
      state.comments[action.payload] = {
        requestStatus: RequestStatus.PENDING,
        data: [],
      };
    })
    .addCase(ActionCreator.saveComments, (state, action) => {
      state.comments[action.payload.guitarId] = {
        requestStatus: RequestStatus.SUCCESS,
        data: action.payload.comments,
      };
    })
    .addCase(ActionCreator.setErrorLoadComments, (state, action) => {
      state.comments[action.payload] = {
        requestStatus: RequestStatus.ERROR,
        data: [],
      };
    })
    .addCase(ActionCreator.setPriceRange, (state, action) => {
      state.priceRange = action.payload;
    });
});

export type {DataState};
export {initialState as initialDataState};
