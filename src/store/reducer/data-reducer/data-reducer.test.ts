import { dataReducer, initialDataState } from './data-reducer';
import { ActionCreator } from '../../actions';
import { RequestStatus } from '../../../types/types';
import { getMockComment, getMockGuitar, Mock } from '../../../utils/mock';

describe('Reducer: Data', () => {
  const state = initialDataState;

  it('should return initial state without additional parameters', () => {
    expect(dataReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should set request status "PENDING" with empty guitars data', () => {
    expect(dataReducer(state, ActionCreator.startLoadGuitars()))
      .toEqual({
        ...state,
        guitars: {
          requestStatus: RequestStatus.PENDING,
          data: [],
        },
      });
  });

  it('should set request status "ERROR" with empty guitars data', () => {
    expect(dataReducer(state, ActionCreator.setErrorLoadGuitars()))
      .toEqual({
        ...state,
        guitars: {
          requestStatus: RequestStatus.ERROR,
          data: [],
        },
      });
  });

  it('should set request status "SUCCESS" with correct guitars data', () => {
    const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);
    expect(dataReducer(state, ActionCreator.saveGuitars(guitars)))
      .toEqual({
        ...state,
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: guitars,
        },
      });
  });

  it('should set request status "PENDING" with empty comments data', () => {
    expect(dataReducer(state, ActionCreator.startLoadComments(Mock.id)))
      .toEqual({
        ...state,
        comments: {
          [Mock.id]: {
            requestStatus: RequestStatus.PENDING,
            data: [],
          },
        },
      });
  });

  it('should set request status "ERROR" with empty comments data', () => {
    expect(dataReducer(state, ActionCreator.setErrorLoadComments(Mock.id)))
      .toEqual({
        ...state,
        comments: {
          [Mock.id]: {
            requestStatus: RequestStatus.ERROR,
            data: [],
          },
        },
      });
  });

  it('should set request status "SUCCESS" with correct comments data', () => {
    const comments = Array.from({length: Mock.arrayLength}, () => getMockComment(Mock.id));
    expect(dataReducer(state, ActionCreator.saveComments(Mock.id, comments)))
      .toEqual({
        ...state,
        comments: {
          [Mock.id]: {
            requestStatus: RequestStatus.SUCCESS,
            data: comments,
          },
        },
      });
  });

  it('should set catalog prices range correctly', () => {
    expect(dataReducer(state, ActionCreator.setPriceRange(Mock.minPrice, Mock.maxPrice)))
      .toEqual({
        ...state,
        priceRange: {
          min: Mock.minPrice,
          max: Mock.maxPrice,
        },
      });
  });
});
