import { createReducer } from '@reduxjs/toolkit';
import { ActionCreator } from '../../actions';

type AppState = {
  isAppInitialized: boolean,
  isSubmitting: boolean,
}

const initialState: AppState = {
  isAppInitialized: false,
  isSubmitting: false,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.initializeApp, (state) => {
      state.isAppInitialized = true;
    })
    .addCase(ActionCreator.setSubmitting, (state, action) => {
      state.isSubmitting = action.payload;
    });
});

export {initialState as initialAppState};
