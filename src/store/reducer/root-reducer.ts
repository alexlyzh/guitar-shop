import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data-reducer/data-reducer';
import {appReducer} from './app-reducer/app-reducer';

type State = ReturnType<typeof rootReducer>;

enum NameSpace {
  APP = 'APP',
  DATA = 'DATA',
}

const rootReducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.APP]: appReducer,
});

export default rootReducer;
export type {State};
