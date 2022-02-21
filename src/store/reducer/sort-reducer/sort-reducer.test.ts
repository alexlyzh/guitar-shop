import {initialSortState, sortReducer} from './sort-reducer';
import {ActionCreator} from '../../actions';
import {SortOrder, SortType} from '../../../const/common';

describe('Reducer: Sort', () => {
  const state = initialSortState;

  it('should return initial state without additional parameters', () => {
    expect(sortReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change sort correctly', () => {
    expect(sortReducer(state, ActionCreator.setSort({
      type: SortType.RATING,
      order: SortOrder.ASC,
    })))
      .toEqual(
        {
          currentSort: {
            type: SortType.RATING,
            order: SortOrder.ASC,
          },
        },
      );
  });
});
