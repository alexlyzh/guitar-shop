import { cartReducer, cartAction, initialCartState, countLimit } from './cart-reducer';
import { getMockGuitar } from '../../../utils/mock';
import { getRandomInteger } from '../../../utils/common';

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
    const randomCount = getRandomInteger(1,99).toString();
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
});
