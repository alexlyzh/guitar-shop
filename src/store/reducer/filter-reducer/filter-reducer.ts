import {createReducer} from '@reduxjs/toolkit';
import {Price} from '../../../types/types';
import {ActionCreator} from '../../actions';
import {FIRST_PAGE, MIN_PRICE} from '../../../const';

type FilterSettings = {
  page: number,
  priceMin: Price,
  priceMax: Price,
  strings: number[],
  types: string[],
}

type FilterState = {
  currentFilter: FilterSettings,
}

const initialState: FilterState = {
  currentFilter: {
    page: FIRST_PAGE,
    priceMin: null,
    priceMax: null,
    strings: [],
    types: [],
  },
};

export const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.setFilter, (state, action) => {
      state.currentFilter = action.payload;
    })
    .addCase(ActionCreator.setCatalogPage, (state, action) => {
      state.currentFilter.page = action.payload;
    })
    .addCase(ActionCreator.toggleStringCondition, (state, action) => {
      if (state.currentFilter.strings.includes(action.payload)) {
        state.currentFilter.strings = state.currentFilter.strings.filter((string) => string !== action.payload);
        return;
      }
      state.currentFilter.strings.push(action.payload);
    })
    .addCase(ActionCreator.toggleTypeCondition, (state, action) => {
      if (state.currentFilter.types.includes(action.payload)) {
        state.currentFilter.types = state.currentFilter.types.filter((type) => type !== action.payload);
        return;
      }
      state.currentFilter.types.push(action.payload);
    })
    .addCase(ActionCreator.setPriceMin, (state, action) => {
      state.currentFilter.priceMin = action.payload ? Math.max(MIN_PRICE, action.payload) : action.payload;
    })
    .addCase(ActionCreator.setPriceMax, (state, action) => {
      state.currentFilter.priceMax = action.payload ? Math.max(MIN_PRICE, action.payload) : action.payload;
    });
});


export type {FilterSettings, FilterState};
export {initialState as initialFilterState};
