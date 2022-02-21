import { State } from '../root-reducer';
import { createSelector } from '@reduxjs/toolkit';
import { stringCount } from '../../../const/common';

export const getFilterIsActive = (state: State) => state.FILTER.isActive;
export const getCurrentFilter = (state: State) => state.FILTER.currentFilter;
export const getFilteredGuitarTypes = (state: State) => state.FILTER.currentFilter.types;
export const getCatalogPage = (state: State) => state.FILTER.currentFilter.page;

export const getAvailableStringsByFilterTypes = createSelector(getFilteredGuitarTypes, (types) => {
  const availableStrings: number[] = [];
  types.forEach((type) => {
    const strings = stringCount[type];
    availableStrings.push(...strings);
  });
  return [...new Set(availableStrings)];
});
