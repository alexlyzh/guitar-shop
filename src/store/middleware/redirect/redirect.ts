import {Middleware} from '@reduxjs/toolkit';
import browserHistory from '../../../browser-history';
import {ActionType} from '../../actions';
import {State} from '../../reducer/root-reducer';

const redirect: Middleware<unknown, State> = (_state) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT) {
    browserHistory.push(action.payload);
  }
  return next(action);
};

export {redirect};