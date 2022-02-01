import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppMessage, AppPath} from '../../const';
import {initialDataState} from '../../store/reducer/data-reducer/data-reducer';
import {initialSortState} from '../../store/reducer/sort-reducer/sort-reducer';
import {initialFilterState} from '../../store/reducer/filter-reducer/filter-reducer';
import {Mock, mockGuitarsWithComments} from '../../utils/mock';
import App from './app';
import {RequestStatus} from '../../types/types';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('Application routing', () => {
  it('should correctly render CatalogPage when have got an error navigating to "/catalog"', () => {
    history.push(AppPath.catalog);
    const store = mockStore({
      APP: {
        isAppInitialized: true,
      },
      DATA: {
        ...initialDataState,
        guitars: {
          requestStatus: RequestStatus.ERROR,
          data: [],
        },
      },
      SORT: initialSortState,
      FILTER: initialFilterState,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(AppMessage.ErrorOnGetGuitars)).toBeInTheDocument();
  });

  it('should correctly render CatalogPage when navigating to "/catalog"', () => {
    history.push(AppPath.catalog);
    const {guitars, comments} = mockGuitarsWithComments();

    const store = mockStore({
      APP: {
        isAppInitialized: true,
      },
      DATA: {
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: guitars,
        },
        comments,
        priceRange: {
          min: Mock.minPrice,
          max: Mock.maxPrice,
        },
      },
      SORT: initialSortState,
      FILTER: initialFilterState,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(AppMessage.CatalogPageHeading)).toBeInTheDocument();
  });
});
