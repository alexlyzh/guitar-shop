import {createAction} from '@reduxjs/toolkit';

enum ActionType {
  START_LOAD_GUITARS ='DATA | START_LOAD_GUITARS',
  SAVE_GUITARS ='DATA | SAVE_GUITARS',
  ERROR_LOAD_GUITARS ='DATA | ERROR_LOAD_GUITARS',
  CHANGE_CATALOG_SORT = 'APP | CHANGE_CATALOG_SORT',
}

const ActionCreator = {
  saveGuitars: createAction(ActionType.SAVE_GUITARS, (guitars) => ({
    payload: guitars,
  })),

  startLoadGuitars: createAction(ActionType.START_LOAD_GUITARS),

  setErrorLoadGuitars: createAction(ActionType.ERROR_LOAD_GUITARS),

  changeCatalogSort: createAction(ActionType.CHANGE_CATALOG_SORT, (sort) => ({
    payload: sort,
  })),
};

export {ActionCreator, ActionType};
