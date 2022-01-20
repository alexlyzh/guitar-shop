import {appReducer} from './app-reducer';
import {ActionCreator} from '../../actions';

describe('Reducer: FilterContainer', () => {
  it('should initialize correctly', () => {
    const initialState = {
      isAppInitialized: false,
    };

    expect(appReducer(initialState, ActionCreator.initializeApp()))
      .toEqual({isAppInitialized: true});
  });
});
