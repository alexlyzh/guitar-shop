import { createSlice } from '@reduxjs/toolkit';

const countLimit = <const>{
  max: 99,
  min: 1,
};

type CartItem = {
  guitarId: number,
  count: number,
}

type CartState = {
  items: CartItem[],
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push({
        guitarId: action.payload,
        count: 1,
      });
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.guitarId !== action.payload);
    },
    incrementCount: (state, action) => {
      for (const item of state.items) {
        if (item.guitarId === action.payload) {
          item.count = Math.min(countLimit.max, item.count + 1);
          break;
        }
      }
    },
    decrementCount: (state, action) => {
      for (const item of state.items) {
        if (item.guitarId === action.payload) {
          item.count = item.count - 1;
          break;
        }
      }
    },
    setCount: (state, action) => {
      const { guitarId, count } = action.payload;
      const cartItem = state.items.find((item) => item.guitarId === guitarId);
      if (cartItem) {
        cartItem.count = Math.min(countLimit.max, count);
        return;
      }
      state.items.push({ guitarId, count: Math.min(countLimit.max, count) });
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
