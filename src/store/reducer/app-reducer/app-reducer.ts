import { createReducer } from '@reduxjs/toolkit';
import { ActionCreator } from '../../actions';

type AppState = {
  isSubmitting: boolean,
}

const initialState: AppState = {
  isSubmitting: false,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.setSubmitting, (state, action) => {
      state.isSubmitting = action.payload;
    });
});

export {initialState as initialAppState};
