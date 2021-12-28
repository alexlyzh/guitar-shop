import {createReducer} from '@reduxjs/toolkit';
import {Guitar, RequestedData, RequestStatus} from '../../../types/types';
import {ActionCreator} from '../../actions';
import {GuitarType, SortOrder, SortType} from '../../../const';

type SortSettings = {
  type?: SortType,
  order?: SortOrder,
}

type FilterSettings = {
  priceFrom: number | null,
  priceTo: number | null,
  stringCount: number[],
  type: GuitarType | null,
}

type State = {
  guitars: RequestedData<Guitar>,
  currentFilter: FilterSettings,
  currentSort: SortSettings,
}

const initialState: State = {
  guitars: {
    requestStatus: RequestStatus.IDLE,
    data: [],
  },
  currentFilter: {
    priceFrom: null,
    priceTo: null,
    stringCount: [],
    type: null,
  },
  currentSort: {},
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
    .addCase(ActionCreator.changeSort, (state, action) => {
      state.currentSort = action.payload;
    })
    .addCase(ActionCreator.changeFilter, (state, action) => {
      state.currentFilter = action.payload;
    });
});


export type {FilterSettings, SortSettings};
