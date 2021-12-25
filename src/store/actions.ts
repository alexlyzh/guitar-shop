import {createAction} from '@reduxjs/toolkit';

enum ActionType {
  START_LOAD_GUITARS ='DATA | START_LOAD_GUITARS',
  SAVE_GUITARS ='DATA | SAVE_GUITARS',
  ERROR_LOAD_GUITARS ='DATA | ERROR_LOAD_GUITARS',
  CHANGE_SEARCH = 'APP | CHANGE_SEARCH',
}

const ActionCreator = {
  saveGuitars: createAction(ActionType.SAVE_GUITARS, (guitars) => ({
    payload: guitars,
  })),

  startLoadGuitars: createAction(ActionType.START_LOAD_GUITARS),

  setErrorLoadGuitars: createAction(ActionType.ERROR_LOAD_GUITARS),

  changeSearch: createAction(ActionType.CHANGE_SEARCH, (search) => ({
    payload: search,
  })),
};

export {ActionCreator};
export type {ActionType};
