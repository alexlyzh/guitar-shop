import {Middleware} from '@reduxjs/toolkit';
import {State} from '../../root-reducer';
import {ActionType} from '../../../actions';
import {initialSort} from '../../../../const';

export const processSortChange: Middleware<unknown, State> = (store) => (next) => (action) => {
  if (action.type === ActionType.CHANGE_CATALOG_SORT) {
    const currentSort = store.getState().APP.currentSort;

    if (currentSort.type === null && currentSort.order === null) {
      action.payload = {...initialSort, ...action.payload};
      return next(action);
    }

    action.payload = {...currentSort, ...action.payload};
  }

  return next(action);
};
