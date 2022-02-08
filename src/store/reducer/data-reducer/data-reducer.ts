import { createReducer } from '@reduxjs/toolkit';
import { GuitarWithComments, RemoteData, RequestStatus } from '../../../types/types';
import { ActionCreator } from '../../actions';

type DataState = {
  guitars: RemoteData<GuitarWithComments>,
  priceRange: {
    min?: number,
    max?: number,
  }
}

const initialState: DataState = {
  guitars: {
    requestStatus: RequestStatus.IDLE,
    data: [],
  },
  priceRange: {},
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
    .addCase(ActionCreator.saveGuitar, (state, action) => {
      state.guitars.requestStatus = RequestStatus.SUCCESS;
      state.guitars.data.push(action.payload);
    })
    .addCase(ActionCreator.setErrorLoadGuitars, (state) => {
      state.guitars = {
        requestStatus: RequestStatus.ERROR,
        data: [],
      };
    })
    .addCase(ActionCreator.addComment, (state, action) => {
      for (const guitar of state.guitars.data) {
        if (guitar.id === action.payload.guitarId) {
          guitar.comments.push(action.payload.comment);
          break;
        }
      }
    })
    .addCase(ActionCreator.setPriceRange, (state, action) => {
      state.priceRange = action.payload;
    });
});

export type {DataState};
export {initialState as initialDataState};
