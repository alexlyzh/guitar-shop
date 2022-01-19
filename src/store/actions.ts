import {createAction} from '@reduxjs/toolkit';
import {Comment, Guitar, Price} from '../types/types';
import {SortSettings} from './reducer/sort-reducer/sort-reducer';
import {FilterSettings} from './reducer/filter-reducer/filter-reducer';

enum ActionType {
  INIT_APP = 'APP / initializeApp',
  REDIRECT = 'FILTER / redirect',
  START_LOAD_GUITARS = 'DATA / startLoadGuitars',
  SAVE_GUITARS = 'DATA / saveGuitars',
  ERROR_LOAD_GUITARS ='DATA / errorLoadGuitars',
  START_LOAD_COMMENTS = 'DATA / startLoadComments',
  SAVE_COMMENTS = 'DATA / saveComments',
  ERROR_LOAD_COMMENTS = 'DATA / errorLoadComments',
  SET_PRICE_RANGE = 'DATA / setPriceRange',
  SET_FILTER = 'FILTER / setFilter',
  TOGGLE_STRING_CONDITION = 'FILTER / toggleStringCondition',
  TOGGLE_TYPE_CONDITION = 'FILTER / toggleTypeCondition',
  SET_PRICE_MIN= 'FILTER / setPriceMin',
  SET_PRICE_MAX = 'FILTER / setPriceMax',
  SET_CATALOG_PAGE = 'FILTER / setCatalogPage',
  SET_SORT = 'SORT / setSort',
}

const ActionCreator = {
  initializeApp: createAction(ActionType.INIT_APP),

  startLoadGuitars: createAction(ActionType.START_LOAD_GUITARS),

  saveGuitars: createAction(ActionType.SAVE_GUITARS, (guitars: Guitar[]) => ({payload: guitars})),

  setErrorLoadGuitars: createAction(ActionType.ERROR_LOAD_GUITARS),

  setPriceRange: createAction(ActionType.SET_PRICE_RANGE, (min, max) => ({payload: {min, max}})),

  startLoadComments: createAction(ActionType.START_LOAD_COMMENTS, (guitarId: number) => ({payload: guitarId})),

  saveComments: createAction(ActionType.SAVE_COMMENTS, (guitarId: number, comments: Comment[]) => ({ payload: {guitarId, comments} })),

  setErrorLoadComments: createAction(ActionType.ERROR_LOAD_COMMENTS, (guitarId: number) => ({payload: guitarId})),

  setFilter: createAction(ActionType.SET_FILTER, (filter: FilterSettings) => ({payload: filter})),

  toggleStringCondition: createAction(ActionType.TOGGLE_STRING_CONDITION, (stringCount: number) => ({payload: stringCount})),

  toggleTypeCondition: createAction(ActionType.TOGGLE_TYPE_CONDITION, (type: string) => ({payload: type})),

  setSort: createAction(ActionType.SET_SORT, (sort: SortSettings) => ({payload: sort})),

  setPriceMin: createAction(ActionType.SET_PRICE_MIN, (price: Price) => ({payload: price})),

  setPriceMax: createAction(ActionType.SET_PRICE_MAX, (price: Price) => ({payload: price})),

  updateFilterUrl: createAction(ActionType.REDIRECT, (url: string) => ({payload: url})),

  setCatalogPage: createAction(ActionType.SET_CATALOG_PAGE, (page: number) => ({payload: page})),
};

export {ActionCreator, ActionType};
