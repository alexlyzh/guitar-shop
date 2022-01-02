import {createAction} from '@reduxjs/toolkit';
import {Guitar, Price} from '../types/types';
import {SortSettings} from './reducer/data-reducer/data-reducer';

enum ActionType {
  FAKE = 'FAKE',
  START_LOAD_GUITARS ='DATA | START_LOAD_GUITARS',
  SAVE_GUITARS ='DATA | SAVE_GUITARS',
  ERROR_LOAD_GUITARS ='DATA | ERROR_LOAD_GUITARS',
  SET_PRICE_RANGE = 'DATA | SET_PRICE_RANGE',
  CHANGE_SORT = 'DATA | CHANGE_SORT',
  FILTER_PRICE_MIN= 'DATA | FILTER_PRICE_MIN',
  FILTER_PRICE_MAX = 'DATA | FILTER_PRICE_MAX',
}

const ActionCreator = {
  fake: createAction(ActionType.FAKE),

  saveGuitars: createAction(ActionType.SAVE_GUITARS, (guitars: Guitar[]) => ({payload: guitars})),

  setPriceRange: createAction(ActionType.SET_PRICE_RANGE, (min, max) => ({payload: {min, max}})),

  startLoadGuitars: createAction(ActionType.START_LOAD_GUITARS),

  setErrorLoadGuitars: createAction(ActionType.ERROR_LOAD_GUITARS),

  changeSort: createAction(ActionType.CHANGE_SORT, (sort: SortSettings) => ({payload: sort})),

  changePriceMin: createAction(ActionType.FILTER_PRICE_MIN, (price: Price) => ({payload: price})),

  changePriceMax: createAction(ActionType.FILTER_PRICE_MAX, (price: Price) => ({payload: price})),
};

export {ActionCreator, ActionType};
