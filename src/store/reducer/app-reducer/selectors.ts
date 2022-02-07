import { State } from '../root-reducer';

export const getIsCatalogInitialized = (state: State) => state.APP.isCatalogInitialized;
export const getIsSubmitting = (state: State) => state.APP.isSubmitting;
