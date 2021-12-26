import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data-reducer/data-reducer';

type State = ReturnType<typeof reducer>;

enum NameSpace {
  APP = 'APP',
  DATA = 'DATA',
}

const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
});

export default reducer;
export type {State};
