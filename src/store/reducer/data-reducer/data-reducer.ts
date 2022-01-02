import {createReducer} from '@reduxjs/toolkit';
import {Guitar, RequestedData, RequestStatus, Price} from '../../../types/types';
import {ActionCreator} from '../../actions';
import {GuitarType, MIN_PRICE, SortOrder, SortType} from '../../../const';

type SortSettings = {
  type?: SortType,
  order?: SortOrder,
}

type FilterSettings = {
  priceMin: Price,
  priceMax: Price,
  stringCount: number[],
  type: GuitarType | null,
}

type State = {
  guitars: RequestedData<Guitar>,
  currentFilter: FilterSettings,
  currentSort: SortSettings,
  priceRange: {
    min: number | null,
    max: number | null,
  }
}

const initialState: State = {
  guitars: {
    requestStatus: RequestStatus.IDLE,
    data: [],
  },
  currentFilter: {
    priceMin: null,
    priceMax: null,
    stringCount: [],
    type: null,
  },
  currentSort: {},
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
    })
    .addCase(ActionCreator.changeSort, (state, action) => {
      state.currentSort = action.payload;
    })
    .addCase(ActionCreator.changePriceMin, (state, action) => {
      state.currentFilter.priceMin = action.payload ? Math.max(MIN_PRICE, action.payload) : action.payload;
    })
    .addCase(ActionCreator.changePriceMax, (state, action) => {
      state.currentFilter.priceMax = action.payload ? Math.max(MIN_PRICE, action.payload) : action.payload;
    });
});


export type {FilterSettings, SortSettings};
