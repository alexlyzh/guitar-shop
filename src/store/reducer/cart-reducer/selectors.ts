import { State } from '../root-reducer';
import { createSelector } from '@reduxjs/toolkit';

export const getCartItems = (state: State) => state.CART.items;
export const getDiscount = (state: State) => state.CART.discount;

export const getTotalCartPrice = createSelector(
  getCartItems,
  (items) => items.reduce((price, item) => price + (item.guitar.price * item.count), 0),
);

export const getTotalCartCount = createSelector(
  getCartItems,
  (items) => items.reduce((count, item) => count + item.count, 0),
);
