import {State} from '../root-reducer';
import {createSelector} from '@reduxjs/toolkit';
import {stringCount} from '../../../const';

const getCurrentFilter = (state: State) => state.FILTER.currentFilter;
const getFilteredGuitarTypes = (state: State) => state.FILTER.currentFilter.types;
export const getCatalogPage = (state: State) => state.FILTER.currentFilter.page;

const getAvailableStringsByFilterTypes = createSelector(getFilteredGuitarTypes, (types) => {
  const availableStrings: number[] = [];
  types.forEach((type) => {
    const strings = stringCount[type];
    availableStrings.push(...strings);
  });
  return [...new Set(availableStrings)];
});

export {getCurrentFilter, getAvailableStringsByFilterTypes};
