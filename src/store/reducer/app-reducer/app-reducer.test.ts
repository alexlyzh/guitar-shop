import { appReducer, initialAppState } from './app-reducer';
import { ActionCreator } from '../../actions';
import {getRandomInteger} from '../../../utils/common';

describe('Reducer: FilterContainer', () => {
  it('should return initial state without additional parameters', () => {
    expect(appReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialAppState);
  });

  it('should set submitting state correctly', () => {
    const isSubmitting = Boolean(getRandomInteger());
    expect(appReducer(initialAppState, ActionCreator.setSubmitting(isSubmitting)))
      .toEqual({
        ...initialAppState,
        isSubmitting,
      });
  });
});
