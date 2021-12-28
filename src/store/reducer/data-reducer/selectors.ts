import {State} from '../root-reducer';
import {createSelector} from '@reduxjs/toolkit';

export const getGuitars = (state: State) => state.DATA.guitars;
export const getCurrentSort = (state: State) => state.DATA.currentSort;
export const getCurrentFilter = (state: State) => state.DATA.currentFilter;

export const getPricesRange = createSelector(getGuitars, (guitars) => {
  let priceMin = 0;
  let priceMax = 0;
  guitars.data.forEach((guitar) => {
    priceMin = priceMin === 0 ? guitar.price : Math.min(priceMin, guitar.price);
    priceMax = Math.max(priceMax, guitar.price);
  });
  return { priceMin, priceMax };
});
