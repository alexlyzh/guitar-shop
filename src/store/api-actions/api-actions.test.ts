import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { generatePath } from 'react-router-dom';
import { Action, AnyAction } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../reducer/root-reducer';
import { BASE_API_URL, createApi } from '../../api';
import { apiRoute, AppPath, FIRST_PAGE, HttpCode, SortOrder, SortType } from '../../const';
import { getMockComment, getMockCommentPost, getMockGuitar, Mock } from '../../utils/mock';
import { ActionAPI } from './api-actions';
import { ActionCreator } from '../actions';
import { createCatalogApiUrl, createCatalogAppUrl, embedComments, parseGuitarsData } from '../../utils/api';
import { initialSortState } from '../reducer/sort-reducer/sort-reducer';
import { initialFilterState } from '../reducer/filter-reducer/filter-reducer';
import { getRandomInteger } from '../../utils/common';

const api = createApi();
const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Async actions', () => {
  it('should dispatch correct actions calling updateFilter', async () => {
    const filter = {
      page: FIRST_PAGE,
      priceMin: Mock.guitar.price,
      priceMax: Mock.guitar.price,
      strings: [Mock.guitar.stringCount],
      types: [Mock.guitar.type],
    };
    const store = mockStore({
      FILTER: {
        currentFilter: filter,
      },
      SORT: initialSortState,
    });

    const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);
    const { minPrice, maxPrice } = parseGuitarsData(guitars);
    mockApi
      .onGet(`${createCatalogApiUrl(filter, initialSortState.currentSort).href}&${apiRoute.search.embed}=comments`)
      .reply(HttpCode.OK, guitars);

    await store.dispatch(ActionAPI.updateFilter());

    expect(store.getActions()).toEqual([
      ActionCreator.updateCatalogUrl(`${AppPath.catalog}${createCatalogAppUrl(filter).search}`),
      ActionCreator.startLoadGuitars(),
      ActionCreator.saveGuitars(guitars),
      ActionCreator.setPriceRange(minPrice, maxPrice),
    ]);
  });

  it('should dispatch correct actions calling getGuitars', async () => {
    const filter = {
      page: FIRST_PAGE,
      priceMin: Mock.guitar.price,
      priceMax: Mock.guitar.price,
      strings: [Mock.guitar.stringCount],
      types: [Mock.guitar.type],
    };

    const store = mockStore({
      FILTER: {
        currentFilter: filter,
      },
      SORT: initialSortState,
    });

    const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);
    const { minPrice, maxPrice } = parseGuitarsData(guitars);
    const apiUrl = createCatalogApiUrl(filter, initialSortState.currentSort);
    mockApi
      .onGet(apiUrl.href)
      .reply(HttpCode.OK, guitars);

    await store.dispatch(ActionAPI.getGuitars(new URLSearchParams(apiUrl.search)));

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
      ActionCreator.saveGuitars(guitars),
      ActionCreator.setPriceRange(minPrice, maxPrice),
    ]);
  });

  it('should dispatch correct actions calling getGuitarWithCommentsById', async () => {
    const store = mockStore();
    const guitar = getMockGuitar();
    const params = new URLSearchParams();
    const endpoint = `${generatePath(apiRoute.path.guitar, {id: guitar.id})}?${embedComments(params)}`;
    mockApi
      .onGet(generatePath(endpoint))
      .reply(HttpCode.OK, guitar);

    await store.dispatch(ActionAPI.getGuitarById(guitar.id));

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
      ActionCreator.saveGuitar(guitar),
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

    const url = createCatalogApiUrl(initialFilterState.currentFilter, sortUpdate);
    embedComments(url.searchParams);
    mockApi
      .onGet(url.href)
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
