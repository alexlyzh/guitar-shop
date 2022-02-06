import { createReducer } from '@reduxjs/toolkit';
import { ActionCreator } from '../../actions';

type AppState = {
  isCatalogInitialized: boolean,
  isSubmitting: boolean,
}

const initialState: AppState = {
  isCatalogInitialized: false,
  isSubmitting: false,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.initializeCatalog, (state) => {
      state.isCatalogInitialized = true;
    })
    .addCase(ActionCreator.setSubmitting, (state, action) => {
      state.isSubmitting = action.payload;
    });
});

export {initialState as initialAppState};
