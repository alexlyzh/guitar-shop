import {Action, AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../reducer/root-reducer';
import {BASE_API_URL, createApi} from '../../api';
import {apiRoute, AppPath, FIRST_PAGE, HttpCode, SortOrder, SortType} from '../../const';
import {getMockComment, getMockGuitar, Mock} from '../../utils/mock';
import {ActionAPI} from './api-actions';
import {ActionCreator} from '../actions';
import {parseGuitarsData} from './utils';
import {generatePath} from 'react-router-dom';
import {initialSortState} from '../reducer/sort-reducer/sort-reducer';
import {initialFilterState} from '../reducer/filter-reducer/filter-reducer';

const api = createApi();
const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Async actions', () => {
  it('should dispatch correct actions on GET/guitars', async () => {
    const store = mockStore();
    const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);
    const {minPrice, maxPrice} = parseGuitarsData(guitars);

    mockApi.onGet(apiRoute.path.guitars).reply(HttpCode.OK, guitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.getGuitarsPriceRange());

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
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

  it('should dispatch correct actions on filter change', async () => {
    const store = mockStore({
      FILTER: {
        currentFilter: {
          page: FIRST_PAGE,
          priceMin: Mock.guitar.price,
          priceMax: Mock.guitar.price,
          strings: [Mock.guitar.stringCount],
          types: [Mock.guitar.type],
        },
      },
      SORT: initialSortState,
    });
    const guitars = [Mock.guitar];

    mockApi
      .onGet(`${BASE_API_URL}${Mock.searchParams.filterApiQuery}`)
      .reply(HttpCode.OK, guitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionAPI.updateFilter());

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadGuitars(),
      ActionCreator.updateFilterUrl(`${AppPath.catalog}?page=${FIRST_PAGE}&${Mock.searchParams.filterAppSearch}`),
      ActionCreator.saveGuitars(guitars),
    ]);
  });
});
