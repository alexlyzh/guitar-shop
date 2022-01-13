import {createReducer} from '@reduxjs/toolkit';
import {ActionCreator} from '../../actions';
import {SortOrder, SortType} from '../../../const';

type SortSettings = {
  type?: SortType,
  order?: SortOrder,
}

type SortState = {
  currentSort: SortSettings,
}

const initialState: SortState = {
  currentSort: {},
};

export const sortReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.changeSort, (state, action) => {
      state.currentSort = action.payload;
    });
});

export type {SortSettings, SortState};
export {initialState as initialSortState};
