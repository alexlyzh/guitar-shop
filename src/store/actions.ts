import {createAction} from '@reduxjs/toolkit';
import {Guitar, Price} from '../types/types';
import {SortSettings} from './reducer/data-reducer/data-reducer';

enum ActionType {
  FAKE = 'FAKE',
  START_LOAD_GUITARS ='DATA | START_LOAD_GUITARS',
  SAVE_GUITARS ='DATA | SAVE_GUITARS',
  ERROR_LOAD_GUITARS ='DATA | ERROR_LOAD_GUITARS',
  CHANGE_SORT = 'APP | CHANGE_SORT',
  CHANGE_PRICE_MIN= 'APP | CHANGE_PRICE_MIN',
  CHANGE_PRICE_MAX = 'APP | CHANGE_PRICE_MAX',
}

const ActionCreator = {
  fake: createAction(ActionType.FAKE),

  saveGuitars: createAction(ActionType.SAVE_GUITARS, (guitars: Guitar[]) => ({payload: guitars})),

  startLoadGuitars: createAction(ActionType.START_LOAD_GUITARS),

  setErrorLoadGuitars: createAction(ActionType.ERROR_LOAD_GUITARS),

  changeSort: createAction(ActionType.CHANGE_SORT, (sort: SortSettings) => ({payload: sort})),

  changePriceMin: createAction(ActionType.CHANGE_PRICE_MIN, (price: Price) => ({payload: price})),

  changePriceMax: createAction(ActionType.CHANGE_PRICE_MAX, (price: Price) => ({payload: price})),
};

export {ActionCreator, ActionType};
