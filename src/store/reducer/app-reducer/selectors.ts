import {State} from '../root-reducer';

export const getIsAppInitialized = (state: State) => state.APP.isAppInitialized;
export const getIsSubmitting = (state: State) => state.APP.isSubmitting;
