import {filterReducer, FilterState, initialFilterState} from './filter-reducer';
import {ActionCreator} from '../../actions';
import {FIRST_PAGE} from '../../../const';
import {getRandomInteger} from '../../../utils/common';
import {Mock} from '../../../utils/mock';

const FAKE_PRICE = 5000;
const FAKE_STRING = 4;
const FAKE_TYPE = 'ukulele';

describe('Reducer: FilterContainer', () => {
  const state = initialFilterState;

  it('should set specified filter settings to state', () => {
    const filterUpdate = {
      page: Mock.pagination.pageNumber.three,
      strings: [4, 6],
      types: [Mock.filter.type.value],
      priceMin: getRandomInteger(Mock.minPrice, Mock.maxPrice),
      priceMax: getRandomInteger(Mock.minPrice, Mock.maxPrice),
    };
    expect(filterReducer(state, ActionCreator.setFilter(filterUpdate)))
      .toEqual({
        currentFilter: filterUpdate,
      });
  });

  it('should return initial state without additional parameters', () => {
    expect(filterReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change min price filter correctly', () => {
    expect(filterReducer(state, ActionCreator.setPriceMin(FAKE_PRICE)))
      .toEqual({
        currentFilter: {
          ...state.currentFilter,
          priceMin: FAKE_PRICE,
        },
      });
  });

  it('should change max price filter correctly', () => {
    expect(filterReducer(state, ActionCreator.setPriceMax(FAKE_PRICE)))
      .toEqual({
        currentFilter: {
          ...state.currentFilter,
          priceMax: FAKE_PRICE,
        },
      });
  });

  it('should toggle strings in filter correctly', () => {
    const initialState: FilterState = {
      currentFilter: {
        page: FIRST_PAGE,
        strings: [],
        types: [],
      },
    };

    expect(filterReducer(initialState, ActionCreator.toggleStringCondition(FAKE_STRING)))
      .toEqual({
        currentFilter: {
          ...initialState.currentFilter,
          strings: [FAKE_STRING],
        },
      });

    initialState.currentFilter.strings.push(FAKE_STRING);

    expect(filterReducer(initialState, ActionCreator.toggleStringCondition(FAKE_STRING)))
      .toEqual({
        currentFilter: {
          ...initialState.currentFilter,
          strings: [],
        },
      });
  });

  it('should toggle types in filter correctly', () => {
    const initialState: FilterState = {
      currentFilter: {
        page: FIRST_PAGE,
        strings: [],
        types: [],
      },
    };

    expect(filterReducer(initialState, ActionCreator.toggleTypeCondition(FAKE_TYPE)))
      .toEqual({
        currentFilter: {
          ...initialState.currentFilter,
          types: [FAKE_TYPE],
        },
      });

    initialState.currentFilter.types.push(FAKE_TYPE);

    expect(filterReducer(initialState, ActionCreator.toggleTypeCondition(FAKE_TYPE)))
      .toEqual({
        currentFilter: {
          ...initialState.currentFilter,
          types: [],
        },
      });
  });
});
