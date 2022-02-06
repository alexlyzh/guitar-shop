import { Action, AnyAction } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../reducer/root-reducer';
import { BASE_API_URL, createApi } from '../../api';
import { apiRoute, AppPath, HttpCode, SortOrder, SortType } from '../../const';
import { getMockComment, getMockCommentPost, getMockGuitar, Mock } from '../../utils/mock';
import { ActionAPI } from './api-actions';
import { ActionCreator } from '../actions';
import { parseGuitarsData } from './utils';
import { generatePath } from 'react-router-dom';
import { initialSortState } from '../reducer/sort-reducer/sort-reducer';
import { initialFilterState } from '../reducer/filter-reducer/filter-reducer';
import { getRandomInteger } from '../../utils/common';

const api = createApi();
const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Async actions', () => {
  it('should dispatch correct actions on getting guitars price range', async () => {
    const store = mockStore();
    const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);
    const {minPrice, maxPrice} = parseGuitarsData(guitars);

    mockApi.onGet(apiRoute.path.guitars).reply(HttpCode.OK, guitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.getGuitarsPriceRange());

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
      ActionCreator.setPriceRange(minPrice, maxPrice),
      ActionCreator.initializeCatalog(),
    ]);
  });

  it('should dispatch correct actions calling getGuitars', async () => {
    const store = mockStore();
    const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);
    mockApi
      .onGet(`${apiRoute.path.guitars}?${Mock.searchParams.filterSearchParamsOnly}`)
      .reply(HttpCode.OK, guitars);

    await store.dispatch(ActionAPI.getGuitars(new URLSearchParams(Mock.searchParams.filterSearchParamsOnly)));

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
      ActionCreator.updateFilterUrl(`${AppPath.catalog}?${Mock.searchParams.filterSearchParamsOnly}`),
      ActionCreator.saveGuitars(guitars),
    ]);
  });

  it('should dispatch correct actions calling getCommentsById', async () => {
    const store = mockStore();
    const guitar = getMockGuitar();
    mockApi
      .onGet(generatePath(apiRoute.path.guitar, {id: guitar.id}))
      .reply(HttpCode.OK, guitar);

    await store.dispatch(ActionAPI.getGuitarById(guitar.id));

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
      ActionCreator.saveGuitar(guitar),
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

  it('should dispatch correct actions and call onSuccess callback on postComment', async () => {
    const store = mockStore();
    const guitarId = getRandomInteger(1, 10);
    const comment = getMockComment(guitarId);
    const commentPost = getMockCommentPost(guitarId, comment);
    const onSuccess = jest.fn();

    mockApi.onPost(apiRoute.path.comments, {...commentPost})
      .reply(HttpCode.OK, comment);

    await store.dispatch(ActionAPI.postComment(commentPost, onSuccess));

    expect(store.getActions()).toEqual([
      ActionCreator.setSubmitting(true),
      ActionCreator.addComment(commentPost.guitarId, comment),
      ActionCreator.setSubmitting(false),
    ]);

    expect(onSuccess).toBeCalled();
  });

  it('should dispatch call setFoundGuitars on search - GET/guitars?name_like=CURT', async () => {
    const store = mockStore();
    const setFoundGuitars = jest.fn();
    const guitars = [Mock.guitar];

    mockApi
      .onGet(`${BASE_API_URL}${Mock.searchParams.nameLikeQuery}`)
      .reply(HttpCode.OK, guitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.searchGuitars(Mock.searchParams.name, setFoundGuitars));

    expect(setFoundGuitars).toBeCalledTimes(1);
    expect(setFoundGuitars).toBeCalledWith(guitars);
    expect(setFoundGuitars).not.toBeCalledWith(getMockGuitar());
  });

  it('should dispatch correct actions on sort price ascending', async () => {
    const store = mockStore({
      FILTER: initialFilterState,
      SORT: initialSortState,
    });
    const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);
    guitars.forEach((guitar, i) => guitar.price = i);

    const sortUpdate = {
      order: SortOrder.ASC,
      type: SortType.PRICE,
    };

    mockApi
      .onGet(`${BASE_API_URL}${Mock.searchParams.sortQuery}`)
      .reply(HttpCode.OK, guitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.updateSort(sortUpdate));

    expect(store.getActions()).toEqual([
      ActionCreator.setSort(sortUpdate),
      ActionCreator.startLoadGuitars(),
      ActionCreator.saveGuitars(guitars),
    ]);
  });
});
