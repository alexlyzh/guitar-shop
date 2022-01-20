import {AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {redirect} from './redirect';
import {State} from '../../reducer/root-reducer';
import {ActionCreator} from '../../actions';
import {AppPath} from '../../../const';
import {Mock} from '../../../utils/mock';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../../browser-history.ts', () => fakeHistory);

const mockStore = configureMockStore<State, AnyAction>([redirect]);
const store = mockStore();

describe('Middlewares: redirect', () => {
  beforeEach(() => fakeHistory.push(''));

  it('should redirect to specified pathname', () => {
    const mockPathname = `${AppPath.Catalog}?${Mock.searchParams.filterAppSearch}`;
    store.dispatch(ActionCreator.updateFilterUrl(mockPathname));
    expect(fakeHistory.location.pathname).toBe(mockPathname);
    expect(store.getActions()).toEqual([ActionCreator.updateFilterUrl(mockPathname)]);
  });

  it('should not redirect to /catalog with unknown actions', () => {
    store.dispatch({
      type: 'UNKNOWN_ACTION',
      payload: AppPath.Catalog,
    });
    expect(fakeHistory.location.pathname).not.toBe(AppPath.Catalog);
  });
});
