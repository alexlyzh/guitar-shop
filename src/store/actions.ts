import { createAction } from '@reduxjs/toolkit';
import { Comment, GuitarWithComments } from '../types/types';
import { SortSettings } from './reducer/sort-reducer/sort-reducer';
import { FilterSettings } from './reducer/filter-reducer/filter-reducer';

enum ActionType {
  setSubmitting = 'APP/setSubmitting',
  redirect = 'APP/redirect',
  startLoadGuitars = 'DATA/startLoadGuitars',
  saveGuitars = 'DATA/saveGuitars',
  errorLoadGuitars ='DATA/errorLoadGuitars',
  addComment = 'DATA/addComment',
  saveGuitar = 'DATA/saveGuitar',
  setPriceRange = 'DATA/setPriceRange',
  setFilterActivity = 'FILTER/setFilterActivity',
  setFilter = 'FILTER/setFilter',
  toggleStringCondition = 'FILTER/toggleStringCondition',
  toggleTypeCondition = 'FILTER/toggleTypeCondition',
  setPriceMin= 'FILTER/setPriceMin',
  setPriceMax = 'FILTER/setPriceMax',
  setCatalogPage = 'FILTER/setCatalogPage',
  setSort = 'SORT/setSort',
}

const ActionCreator = {

  setSubmitting: createAction(ActionType.setSubmitting, (isSubmitting: boolean) => ({payload: isSubmitting})),

  startLoadGuitars: createAction(ActionType.startLoadGuitars),

  saveGuitars: createAction(ActionType.saveGuitars, (guitars: GuitarWithComments[]) => ({payload: guitars})),

  saveGuitar: createAction(ActionType.saveGuitar, (guitar: GuitarWithComments) => ({payload: guitar})),

  setErrorLoadGuitars: createAction(ActionType.errorLoadGuitars),

  setPriceRange: createAction(ActionType.setPriceRange, (min, max) => ({payload: {min, max}})),

  addComment: createAction(ActionType.addComment, (guitarId: number, comment: Comment) => ({payload: {guitarId, comment}})),

  setFilter: createAction(ActionType.setFilter, (filter: FilterSettings) => ({payload: filter})),

  setFilterActivity: createAction(ActionType.setFilterActivity, (isActive: boolean) => ({payload: isActive})),

  toggleStringCondition: createAction(ActionType.toggleStringCondition, (stringCount: number) => ({payload: stringCount})),

  toggleTypeCondition: createAction(ActionType.toggleTypeCondition, (type: string) => ({payload: type})),

  setSort: createAction(ActionType.setSort, (sort: SortSettings) => ({payload: sort})),

  setPriceMin: createAction(ActionType.setPriceMin, (price?: number) => ({payload: price})),

  setPriceMax: createAction(ActionType.setPriceMax, (price?: number) => ({payload: price})),

  updateCatalogUrl: createAction(ActionType.redirect, (url: string) => ({payload: url})),

  setCatalogPage: createAction(ActionType.setCatalogPage, (page: number) => ({payload: page})),
};

export {ActionCreator, ActionType};
