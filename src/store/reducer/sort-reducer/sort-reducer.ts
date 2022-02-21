import {createReducer} from '@reduxjs/toolkit';
import {ActionCreator} from '../../actions';
import {SortOrder, SortType} from '../../../const/common';

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
    .addCase(ActionCreator.setSort, (state, action) => {
      state.currentSort = action.payload;
    });
});

export type {SortSettings, SortState};
export {initialState as initialSortState};
