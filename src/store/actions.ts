import {createAction} from '@reduxjs/toolkit';
import {Comment, Guitar, Price} from '../types/types';
import {SortSettings} from './reducer/sort-reducer/sort-reducer';

enum ActionType {
  FAKE = 'FAKE',
  START_LOAD_GUITARS = 'DATA | START_LOAD_GUITARS',
  SAVE_GUITARS = 'DATA | SAVE_GUITARS',
  ERROR_LOAD_GUITARS ='DATA | ERROR_LOAD_GUITARS',
  START_LOAD_COMMENTS = 'DATA | START_LOAD_COMMENTS',
  SAVE_COMMENTS = 'DATA | SAVE_COMMENTS',
  ERROR_LOAD_COMMENTS = 'DATA | ERROR_LOAD_COMMENTS',
  SET_PRICE_RANGE = 'DATA | SET_PRICE_RANGE',
  TOGGLE_STRING_CONDITION = 'FILTER | TOGGLE_STRING_CONDITION',
  TOGGLE_TYPE_CONDITION = 'FILTER | TOGGLE_TYPE_CONDITION',
  FILTER_PRICE_MIN= 'FILTER | FILTER_PRICE_MIN',
  FILTER_PRICE_MAX = 'FILTER | FILTER_PRICE_MAX',
  CHANGE_SORT = 'SORT | CHANGE_SORT',
}

const ActionCreator = {
  fake: createAction(ActionType.FAKE),

  startLoadGuitars: createAction(ActionType.START_LOAD_GUITARS),

  saveGuitars: createAction(ActionType.SAVE_GUITARS, (guitars: Guitar[]) => ({payload: guitars})),

  setErrorLoadGuitars: createAction(ActionType.ERROR_LOAD_GUITARS),

  setPriceRange: createAction(ActionType.SET_PRICE_RANGE, (min, max) => ({payload: {min, max}})),

  startLoadComments: createAction(ActionType.START_LOAD_COMMENTS, (guitarId: number) => ({payload: guitarId})),

  saveComments: createAction(ActionType.SAVE_COMMENTS, (guitarId: number, comments: Comment[]) => ({ payload: {guitarId, comments} })),

  setErrorLoadComments: createAction(ActionType.ERROR_LOAD_COMMENTS, (guitarId: number) => ({payload: guitarId})),

  toggleStringCondition: createAction(ActionType.TOGGLE_STRING_CONDITION, (stringCount: number) => ({payload: stringCount})),

  toggleTypeCondition: createAction(ActionType.TOGGLE_TYPE_CONDITION, (type: string) => ({payload: type})),

  changeSort: createAction(ActionType.CHANGE_SORT, (sort: SortSettings) => ({payload: sort})),

  changePriceMin: createAction(ActionType.FILTER_PRICE_MIN, (price: Price) => ({payload: price})),

  changePriceMax: createAction(ActionType.FILTER_PRICE_MAX, (price: Price) => ({payload: price})),
};

export {ActionCreator, ActionType};
