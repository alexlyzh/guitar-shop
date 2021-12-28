import {createReducer} from '@reduxjs/toolkit';
import {ActionCreator} from '../../actions';
import {GuitarType, SortOrder, SortType} from '../../../const';

type SortSettings = {
  type?: SortType,
  order?: SortOrder,
}

type FilterSettings = {
  minPrice?: number,
  maxPrice?: number,
  stringCount?: number[],
  type?: GuitarType,
}

type State = {
  currentFilter: FilterSettings,
  currentSort: SortSettings,
}

const initialState: State = {
  currentFilter: {},
  currentSort: {},
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.changeSort, (state, action) => {
      state.currentSort = action.payload;
    });
});

export {appReducer};
export type {SortSettings, FilterSettings};
