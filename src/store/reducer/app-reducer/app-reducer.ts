import {createReducer} from '@reduxjs/toolkit';
import {ActionCreator} from '../../actions';

type AppState = {
  isAppInitialized: boolean,
}

const initialState: AppState = {
  isAppInitialized: false,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.initializeApp, (state) => {
      state.isAppInitialized = true;
    });
});

export {initialState as initialAppState};
