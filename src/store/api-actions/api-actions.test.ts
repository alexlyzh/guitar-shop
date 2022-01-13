import {Action, AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../reducer/root-reducer';
import {BASE_URL, createApi} from '../../api';
import {apiRoute, HttpCode} from '../../const';
import {getMockComment, getMockGuitar, Mock} from '../../utils/mock';
import {ActionAPI} from './api-actions';
import {ActionCreator} from '../actions';
import {parseGuitarsData} from './utils';
import {generatePath} from 'react-router-dom';

const api = createApi();
const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Async actions', () => {
  it('should dispatch correct actions on GET/guitars', async () => {
    const store = mockStore();
    const guitars = Array.from({length: Mock.arrayLength}, () => getMockGuitar());
    const {minPrice, maxPrice} = parseGuitarsData(guitars);

    mockApi.onGet(apiRoute.path.guitars).reply(HttpCode.OK, guitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.getAllGuitars());

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
      ActionCreator.saveGuitars(guitars),
      ActionCreator.setPriceRange(minPrice, maxPrice),
    ]);
  });

  it('should dispatch correct actions on GET/comments', async () => {
    const store = mockStore();
    const comments = Array.from({length: Mock.arrayLength}, () => getMockComment(Mock.id));

    mockApi.onGet(generatePath(apiRoute.path.guitarComments, {id: Mock.id})).reply(HttpCode.OK, comments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.getComments(Mock.id));

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadComments(Mock.id),
      ActionCreator.saveComments(Mock.id, comments),
    ]);
  });

  it('should dispatch correct actions on search - GET/guitars?name_like=CURT', async () => {
    const store = mockStore();
    const setFoundGuitars = jest.fn();
    const guitars = [Mock.guitar];

    mockApi
      .onGet(`${BASE_URL}${apiRoute.path.guitars}?${apiRoute.search.nameLike}=${Mock.searchParams.nameLike}`)
      .reply(HttpCode.OK, guitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.searchGuitars(Mock.searchParams.nameLike, setFoundGuitars));

    expect(setFoundGuitars).toBeCalledTimes(1);
    expect(setFoundGuitars).toBeCalledWith(guitars);
    expect(setFoundGuitars).not.toBeCalledWith(getMockGuitar());
  });
});
