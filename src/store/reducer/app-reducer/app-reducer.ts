import {createReducer} from '@reduxjs/toolkit';
import {ActionCreator} from '../../actions';
import {SortOrder, SortType} from '../../../const';

type CurrentSort = {
  type: SortType | null,
  order: SortOrder | null,
}

type State = {
  currentSort: CurrentSort,
}

const initialState: State = {
  currentSort: {
    type: null,
    order: null,
  },
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.changeSort, (state, action) => {
      state.currentSort = action.payload;
    });
});

export type {CurrentSort};
export {appReducer};
