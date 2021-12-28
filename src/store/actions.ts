import {createAction} from '@reduxjs/toolkit';

enum ActionType {
  START_LOAD_GUITARS ='DATA | START_LOAD_GUITARS',
  SAVE_GUITARS ='DATA | SAVE_GUITARS',
  ERROR_LOAD_GUITARS ='DATA | ERROR_LOAD_GUITARS',
  CHANGE_SORT = 'APP | CHANGE_SORT',
  CHANGE_FILTER = 'APP | CHANGE_FILTER',
}

const ActionCreator = {
  saveRenderGuitars: createAction(ActionType.SAVE_GUITARS, (guitars) => ({payload: guitars})),

  startLoadGuitars: createAction(ActionType.START_LOAD_GUITARS),

  setErrorLoadGuitars: createAction(ActionType.ERROR_LOAD_GUITARS),

  changeSort: createAction(ActionType.CHANGE_SORT, (sort) => ({payload: sort})),

  changeFilter: createAction(ActionType.CHANGE_FILTER, (filter) => ({payload: filter})),
};

export {ActionCreator, ActionType};
