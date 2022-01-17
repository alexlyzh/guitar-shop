import {createAction} from '@reduxjs/toolkit';
import {Comment, Guitar, Price} from '../types/types';
import {SortSettings} from './reducer/sort-reducer/sort-reducer';

enum ActionType {
  START_LOAD_GUITARS = 'DATA / startLoadGuitars',
  SAVE_GUITARS = 'DATA / saveGuitars',
  ERROR_LOAD_GUITARS ='DATA / errorLoadGuitars',
  START_LOAD_COMMENTS = 'DATA / startLoadComments',
  SAVE_COMMENTS = 'DATA / saveComments',
  ERROR_LOAD_COMMENTS = 'DATA / errorLoadComments',
  SET_PRICE_RANGE = 'DATA / setPriceRange',
  TOGGLE_STRING_CONDITION = 'FILTER / toggleStringCondition',
  TOGGLE_TYPE_CONDITION = 'FILTER / toggleTypeCondition',
  FILTER_PRICE_MIN= 'FILTER / filterPriceMin',
  FILTER_PRICE_MAX = 'FILTER / filterPriceMax',
  CHANGE_SORT = 'SORT / changeSort',
}

const ActionCreator = {
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
