import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data-reducer/data-reducer';
import {sortReducer} from './sort-reducer/sort-reducer';
import {filterReducer} from './filter-reducer/filter-reducer';

export type State = ReturnType<typeof rootReducer>;

enum NameSpace {
  DATA = 'DATA',
  FILTER = 'FILTER',
  SORT = 'SORT',
}

const rootReducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.SORT]: sortReducer,
  [NameSpace.FILTER]: filterReducer,
});

export default rootReducer;
