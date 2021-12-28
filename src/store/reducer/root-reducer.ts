import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data-reducer/data-reducer';

type State = ReturnType<typeof rootReducer>;

enum NameSpace {
  APP = 'APP',
  DATA = 'DATA',
}

const rootReducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
});

export default rootReducer;
export type {State};
