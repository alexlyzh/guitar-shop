import {State} from '../root-reducer';

export const getGuitars = (state: State) => state.DATA.guitars;
export const getCurrentSort = (state: State) => state.DATA.currentSort;
export const getCurrentFilter = (state: State) => state.DATA.currentFilter;
export const getCatalogPriceRange = (state: State) => state.DATA.priceRange;
