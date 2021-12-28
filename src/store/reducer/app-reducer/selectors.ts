import {State} from '../root-reducer';

export const getCurrentSort = (state: State) => state.APP.currentSort;
export const getCurrentFilter = (state: State) => state.APP.currentFilter;
