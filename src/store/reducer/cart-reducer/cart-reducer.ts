import { createSlice } from '@reduxjs/toolkit';
import { CartItem, Guitar } from '../../../types/types';

const countLimit = <const>{
  max: 99,
  min: 1,
};

type CartState = {
  items: CartItem[],
  discount: number,
}

const initialState: CartState = {
  items: [],
  discount: 0,
};

const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    add: (state, action: { type: string, payload: Guitar }) => {
      const cartItem = state.items.find((item) => item.guitar.id === action.payload.id);
      if (cartItem) {
        cartItem.count = Math.min(countLimit.max, cartItem.count + 1);
        return;
      }
      state.items.push({
        guitar: action.payload,
        count: countLimit.min,
      });
    },
    subtract: (state, action: { type: string, payload: Guitar }) => {
      const cartItem = state.items.find((item) => item.guitar.id === action.payload.id);
      if (cartItem) {
        if (cartItem.count > countLimit.min) {
          cartItem.count = Math.min(countLimit.max, cartItem.count - 1);
          return;
        }
        state.items = state.items.filter((item) => item.guitar.id !== cartItem.guitar.id);
      }
    },
    remove: (state, action: { type: string, payload: Guitar }) => {
      state.items = state.items.filter((item) => item.guitar.id !== action.payload.id);
    },
    setCount: (state, action: { type: string, payload: { guitar: Guitar, count: number } }) => {
      const { guitar, count } = action.payload;
      const cartItem = state.items.find((item) => item.guitar.id === guitar.id);
      if (cartItem) {
        cartItem.count = Math.min(countLimit.max, count);
        return;
      }
      state.items.push({ guitar, count: Math.min(countLimit.max, count) });
    },
  },
});

const cartReducer = cartSlice.reducer;
const cartAction = cartSlice.actions;

export {
  initialState as initialCartState,
  cartReducer,
  cartAction
};
