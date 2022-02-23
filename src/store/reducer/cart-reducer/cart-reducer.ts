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
        cartItem.count = cartItem.count - 1;
      }
    },
    remove: (state, action: { type: string, payload: Guitar }) => {
      state.items = state.items.filter((item) => item.guitar.id !== action.payload.id);
    },
    setCount: (state, action: { type: string, payload: { guitar: Guitar, count: string } }) => {
      const { guitar, count } = action.payload;
      const handledCount = Math.min(countLimit.max, Number(count.replace('-', '')));
      const cartItem = state.items.find((item) => item.guitar.id === guitar.id);
      if (cartItem) {
        cartItem.count = handledCount;
        return;
      }
      state.items.push({ guitar, count: handledCount });
    },
  },
});

const cartReducer = cartSlice.reducer;
const cartAction = cartSlice.actions;

export {
  initialState as initialCartState,
  cartReducer,
  cartAction,
  countLimit
};