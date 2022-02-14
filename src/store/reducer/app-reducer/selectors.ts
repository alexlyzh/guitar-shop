import { State } from '../root-reducer';

export const getIsSubmitting = (state: State) => state.APP.isSubmitting;
