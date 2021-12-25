import {createReducer} from '@reduxjs/toolkit';
import {ActionCreator} from '../../actions';
import {INITIAL_SEARCH} from '../../../const';

type State = {
  search: string,
}

const initialState: State = {
  search: INITIAL_SEARCH,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.changeSearch, (state, action) => {
      state.search = action.payload;
    });
});

export {appReducer};
