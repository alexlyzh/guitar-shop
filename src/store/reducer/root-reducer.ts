import { combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './data-reducer/data-reducer';
import { sortReducer } from './sort-reducer/sort-reducer';
import { filterReducer } from './filter-reducer/filter-reducer';
import { appReducer } from './app-reducer/app-reducer';
import { cartReducer } from './cart-reducer/cart-reducer';

export type State = ReturnType<typeof rootReducer>;

export enum NameSpace {
  APP = 'APP',
  DATA = 'DATA',
  FILTER = 'FILTER',
  SORT = 'SORT',
  CART = 'CART',
}

const rootReducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.DATA]: dataReducer,
  [NameSpace.SORT]: sortReducer,
  [NameSpace.FILTER]: filterReducer,
  [NameSpace.CART]: cartReducer,
});

export default rootReducer;
