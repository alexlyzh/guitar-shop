import {createReducer} from '@reduxjs/toolkit';
import {Price} from '../../../types/types';
import {ActionCreator} from '../../actions';
import {MIN_PRICE} from '../../../const';

type FilterSettings = {
  priceMin: Price,
  priceMax: Price,
  strings: number[],
  types: string[],
}

export type FilterState = {
  currentFilter: FilterSettings,
}

const initialState: FilterState = {
  currentFilter: {
    priceMin: null,
    priceMax: null,
    strings: [],
    types: [],
  },
};

export const filterReducer = createReducer(initialState, (builder) => {
  builder
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
    .addCase(ActionCreator.changePriceMin, (state, action) => {
      state.currentFilter.priceMin = action.payload ? Math.max(MIN_PRICE, action.payload) : action.payload;
    })
    .addCase(ActionCreator.changePriceMax, (state, action) => {
      state.currentFilter.priceMax = action.payload ? Math.max(MIN_PRICE, action.payload) : action.payload;
    });
});


export type {FilterSettings};
