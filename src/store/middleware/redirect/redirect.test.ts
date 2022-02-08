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
  replace(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../../browser-history.ts', () => fakeHistory);

const mockStore = configureMockStore<State, AnyAction>([redirect]);
const store = mockStore();

describe('Middlewares: redirect', () => {
  beforeEach(() => fakeHistory.push(''));

  it('should redirect to specified pathname', () => {
    const mockPathname = `${AppPath.catalog}?${Mock.searchParams.filterSearchParamsOnly}`;
    store.dispatch(ActionCreator.updateCatalogUrl(mockPathname));
    expect(fakeHistory.location.pathname).toBe(mockPathname);
    expect(store.getActions()).toEqual([ActionCreator.updateCatalogUrl(mockPathname)]);
  });

  it('should not redirect to /catalog with unknown actions', () => {
    store.dispatch({
      type: 'UNKNOWN_ACTION',
      payload: AppPath.catalog,
    });
    expect(fakeHistory.location.pathname).not.toBe(AppPath.catalog);
  });
});
