import { createAction } from '@reduxjs/toolkit';
import { Comment, Guitar } from '../types/types';
import { SortSettings } from './reducer/sort-reducer/sort-reducer';
import { FilterSettings } from './reducer/filter-reducer/filter-reducer';

enum ActionType {
  initializeCatalog = 'APP / initializeCatalog',
  setSubmitting = 'APP / setSubmitting',
  redirect = 'APP / redirect',
  startLoadGuitars = 'DATA / startLoadGuitars',
  saveGuitars = 'DATA / saveGuitars',
  errorLoadGuitars ='DATA / errorLoadGuitars',
  startLoadComments = 'DATA / startLoadComments',
  saveComments = 'DATA / saveComments',
  errorLoadComments = 'DATA / errorLoadComments',
  addComment = 'DATA / addComment',
  saveGuitar = 'DATA / saveGuitar',
  setPriceRange = 'DATA / setPriceRange',
  setFilterActivity = 'FILTER / setFilterActivity',
  setFilter = 'FILTER / setFilter',
  toggleStringCondition = 'FILTER / toggleStringCondition',
  toggleTypeCondition = 'FILTER / toggleTypeCondition',
  setPriceMin= 'FILTER / setPriceMin',
  setPriceMax = 'FILTER / setPriceMax',
  setCatalogPage = 'FILTER / setCatalogPage',
  setSort = 'SORT / setSort',
}

const ActionCreator = {
  initializeCatalog: createAction(ActionType.initializeCatalog),

  setSubmitting: createAction(ActionType.setSubmitting, (isSubmitting: boolean) => ({payload: isSubmitting})),

  startLoadGuitars: createAction(ActionType.startLoadGuitars),

  saveGuitars: createAction(ActionType.saveGuitars, (guitars: Guitar[]) => ({payload: guitars})),

  saveGuitar: createAction(ActionType.saveGuitar, (guitar: Guitar) => ({payload: guitar})),

  setErrorLoadGuitars: createAction(ActionType.errorLoadGuitars),

  setPriceRange: createAction(ActionType.setPriceRange, (min, max) => ({payload: {min, max}})),

  startLoadComments: createAction(ActionType.startLoadComments, (guitarId: number) => ({payload: guitarId})),

  saveComments: createAction(ActionType.saveComments, (guitarId: number, comments: Comment[]) => ({ payload: {guitarId, comments} })),

  setErrorLoadComments: createAction(ActionType.errorLoadComments, (guitarId: number) => ({payload: guitarId})),

  addComment: createAction(ActionType.addComment, (guitarId: number, comment: Comment) => ({payload: {guitarId, comment}})),

  setFilter: createAction(ActionType.setFilter, (filter: FilterSettings) => ({payload: filter})),

  setFilterActivity: createAction(ActionType.setFilterActivity, (isActive: boolean) => ({payload: isActive})),

  toggleStringCondition: createAction(ActionType.toggleStringCondition, (stringCount: number) => ({payload: stringCount})),

  toggleTypeCondition: createAction(ActionType.toggleTypeCondition, (type: string) => ({payload: type})),

  setSort: createAction(ActionType.setSort, (sort: SortSettings) => ({payload: sort})),

  setPriceMin: createAction(ActionType.setPriceMin, (price?: number) => ({payload: price})),

  setPriceMax: createAction(ActionType.setPriceMax, (price?: number) => ({payload: price})),

  updateFilterUrl: createAction(ActionType.redirect, (url: string) => ({payload: url})),

  setCatalogPage: createAction(ActionType.setCatalogPage, (page: number) => ({payload: page})),
};

export {ActionCreator, ActionType};
