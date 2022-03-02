import { cartReducer, cartAction, initialCartState, countLimit, submitCoupon } from './cart-reducer';
import { getMockGuitar } from '../../../utils/mock';
import { getRandomInteger } from '../../../utils/common';
import { RequestStatus } from '../../../types/types';

const guitar = getMockGuitar();

describe('Reducer: cartReducer', () => {
  it('should return initial state without additional parameters', () => {
    expect(cartReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialCartState);
  });

  it('should add new guitar to cart', () => {
    const state = { ...initialCartState };
    expect(cartReducer(state, cartAction.add(guitar)))
      .toEqual({
        ...state,
        items: [{
          guitar,
          count: 1,
        }],
      });
  });

  it('should increase guitar count in cart correctly', () => {
    const initialCount = getRandomInteger(1, 100);
    const state = {
      ...initialCartState,
      items: [{
        guitar,
        count: initialCount,
      }],
    };

    expect(cartReducer(state, cartAction.add(guitar)))
      .toEqual({
        ...state,
        items: [{
          guitar,
          count: Math.min(initialCount + 1, countLimit.max),
        }],
      });
  });

  it('should subtract one guitar from cart correctly', () => {
    const initialCount = getRandomInteger(2, 99);
    const state = {
      ...initialCartState,
      items: [{
        guitar,
        count: initialCount,
      }],
    };

    expect(cartReducer(state, cartAction.subtract(guitar)))
      .toEqual({
        ...state,
        items: [{
          guitar,
          count: initialCount - 1,
        }],
      });
  });

  it('should remove guitar from cart', () => {
    const state = {
      ...initialCartState,
      items: [{
        guitar,
        count: getRandomInteger(2,99),
      }],
    };

    expect(cartReducer(state, cartAction.remove(guitar)))
      .toEqual({
        ...state,
        items: [],
      });
  });

  it('should set guitar count in cart correctly', () => {
    const randomCount = getRandomInteger(1, 99).toString();
    const initialState = {...initialCartState };

    expect(cartReducer(initialState, cartAction.setCount({
      guitar,
      count: randomCount,
    })))
      .toEqual({
        ...initialState,
        items: [{
          guitar,
          count: Number(randomCount),
        }],
      });
  });

  it('should set discount.requestStatus PENDING when submitCoupon is pending', () => {
    expect(cartReducer(initialCartState, { type: submitCoupon.pending.type }))
      .toEqual({
        ...initialCartState,
        discount: {
          ...initialCartState.discount,
          requestStatus: RequestStatus.PENDING,
        },
      });
  });

  it('should set discount requestStatus = SUCCESS, size & coupon when submitCoupon is fulfilled', () => {
    const payload = { size: 0.25, coupon: 'some' };

    const updatedState = {
      ...initialCartState,
      discount: {
        ...payload,
        requestStatus: RequestStatus.SUCCESS,
      },
    };

    const action = { type: submitCoupon.fulfilled.type, payload };

    const nextState = cartReducer(initialCartState, action);
    expect(nextState).toEqual(updatedState);
  });

  it('should set discount.requestStatus ERROR when submitCoupon is rejected', () => {
    expect(cartReducer(initialCartState, { type: submitCoupon.rejected.type }))
      .toEqual({
        ...initialCartState,
        discount: {
          ...initialCartState.discount,
          requestStatus: RequestStatus.ERROR,
        },
      });
  });
});
