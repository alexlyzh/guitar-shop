import {State} from '../root-reducer';
import {createSelector} from '@reduxjs/toolkit';
import {getGuitars} from '../data-reducer/selectors';
import {sort} from '../../../utils';

export const getCurrentSort = (state: State) => state.APP.currentSort;

export const getSortedGuitars = createSelector(
  [getGuitars, getCurrentSort],
  (guitarsRequest, currentSort) => {
    if (currentSort.order === null && currentSort.type === null) {
      return guitarsRequest;
    }

    return {
      requestStatus: guitarsRequest.requestStatus,
      data: sort(currentSort, guitarsRequest.data),
    };
  });
