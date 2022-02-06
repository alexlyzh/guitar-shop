import browserHistory from '../../../browser-history';
import { Middleware } from '@reduxjs/toolkit';
import { ActionType } from '../../actions';
import { State } from '../../reducer/root-reducer';

const redirect: Middleware<unknown, State> = (_state) => (next) => (action) => {
  if (action.type === ActionType.redirect) {
    browserHistory.replace(action.payload);
  }
  return next(action);
};

export { redirect };
