import {createReducer} from '@reduxjs/toolkit';
import {ActionCreator} from '../../actions';
import {SortOrder, SortType} from '../../../const';

type Sorting = {
  type?: SortType,
  order?: SortOrder,
}

type State = {
  currentSort: Sorting,
}

const initialState: State = {
  currentSort: {},
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.changeSort, (state, action) => {
      state.currentSort = action.payload;
    });
});

export {appReducer};
export type {Sorting};
