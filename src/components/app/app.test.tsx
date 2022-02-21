import App from './app';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Router, generatePath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppMessage} from '../../const/common';
import { initialAppState } from '../../store/reducer/app-reducer/app-reducer';
import { initialDataState } from '../../store/reducer/data-reducer/data-reducer';
import { initialSortState } from '../../store/reducer/sort-reducer/sort-reducer';
import { initialFilterState } from '../../store/reducer/filter-reducer/filter-reducer';
import { Mock, mockGuitarsWithComments, getMockGuitar } from '../../utils/mock';
import { RequestStatus } from '../../types/types';
import { AppPath } from '../../const/app-routes';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('Application routing', () => {
  it('should render ProductPage when navigating to "/catalog/:id"', () => {
    const product = getMockGuitar();
    history.push(generatePath(AppPath.product, {id: product.id}));

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    const store = mockStore({
      APP: initialAppState,
      DATA: {
        ...initialDataState,
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: [product],
        },
        comments: {
          [product.id]: {
            requestStatus: RequestStatus.SUCCESS,
            data: [],
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('product-page')).toBeInTheDocument();
  });

  it('should correctly render CatalogPage when navigating to "/catalog"', () => {
    history.push(AppPath.catalog);
    const {guitars, comments} = mockGuitarsWithComments();

    const store = mockStore({
      APP: {
        ...initialAppState,
        isCatalogInitialized: true,
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
      FILTER: {
        ...initialFilterState,
        isActive: true,
      },
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
