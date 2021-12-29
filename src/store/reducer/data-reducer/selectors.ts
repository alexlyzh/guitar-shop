import {State} from '../root-reducer';
import {createSelector} from '@reduxjs/toolkit';

export const getGuitars = (state: State) => state.DATA.guitars;
export const getCurrentSort = (state: State) => state.DATA.currentSort;
export const getCurrentFilter = (state: State) => state.DATA.currentFilter;

export const getPricesRange = createSelector(getGuitars, (guitars) => {
  let minPriceLimit = 0;
  let maxPriceLimit = 0;
  guitars.data.forEach((guitar) => {
    minPriceLimit = minPriceLimit === 0 ? guitar.price : Math.min(minPriceLimit, guitar.price);
    maxPriceLimit = Math.max(maxPriceLimit, guitar.price);
  });
  return { minPriceLimit, maxPriceLimit };
});
