import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { apiRoute } from '../../../const/api-routes';
import { CartItem, Discount, Guitar, RequestStatus } from '../../../types/types';
import { api } from '../../../api';

const countLimit = <const>{
  max: 99,
  min: 1,
};

const multiplier = <const>{
  couponMultiplier: 100,
  couponDivider: 10000,
};

type CartState = {
  items: CartItem[],
  discount: Discount,
}

const initialState: CartState = {
  items: [],
  discount: {
    size: 0,
    coupon: '',
    requestStatus: RequestStatus.IDLE,
  },
};

const submitCoupon = createAsyncThunk(
  'CART/submitCoupon',
  async (coupon: string) => {
    const {data} = await api.post<number>(generatePath(apiRoute.path.coupons), { coupon });
    return {
      size: Math.trunc(data * multiplier.couponMultiplier) / multiplier.couponDivider,
      coupon,
    };
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(submitCoupon.pending, (state) => {
        state.discount.requestStatus = RequestStatus.PENDING;
      })
      .addCase(submitCoupon.fulfilled, (state, {payload}) => {
        state.discount = {
          size: payload.size,
          coupon: payload.coupon,
          requestStatus: RequestStatus.SUCCESS,
        };
      })
      .addCase(submitCoupon.rejected, (state) => {
        state.discount.requestStatus = RequestStatus.ERROR;
      });
  },
});

const cartReducer = cartSlice.reducer;
const cartAction = cartSlice.actions;

export {
  initialState as initialCartState,
  cartReducer,
  cartAction,
  countLimit,
  submitCoupon
};
