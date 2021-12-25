import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data-reducer/data-reducer';
import {appReducer} from './app-reducer/app-reducer';

type State = ReturnType<typeof reducer>;

enum NameSpace {
  APP = 'APP',
  DATA = 'DATA',
}

const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.APP]: appReducer,
});

export default reducer;
export type {State};
