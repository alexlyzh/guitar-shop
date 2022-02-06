import App from './app';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppMessage, AppPath } from '../../const';
import { initialAppState } from '../../store/reducer/app-reducer/app-reducer';
import { initialSortState } from '../../store/reducer/sort-reducer/sort-reducer';
import { initialFilterState } from '../../store/reducer/filter-reducer/filter-reducer';
import { Mock, mockGuitarsWithComments} from '../../utils/mock';
import { RequestStatus } from '../../types/types';
import { redirect } from '../../store/middleware/redirect/redirect';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk, redirect]);

describe('Application routing', () => {
  // it('should correctly render ProductPage when navigating to "/catalog/:id"', () => {
  //   const product = getMockGuitar();
  //   history.push(generatePath(AppPath.product, {id: product.id}));
  //
  //   const scrollTopMock = jest.fn();
  //   Object.defineProperty(window, 'scrollTo', {value: scrollTopMock})
  //
  //   const store = mockStore({
  //     APP: {
  //       ...initialAppState,
  //       isCatalogInitialized: true,
  //     },
  //     DATA: {
  //       ...initialDataState,
  //       guitars: {
  //         requestStatus: RequestStatus.SUCCESS,
  //         data: [product],
  //       },
  //       comments: {
  //         [product.id]: {
  //           requestStatus: RequestStatus.SUCCESS,
  //           data: [],
  //         },
  //       },
  //     },
  //     SORT: initialSortState,
  //     FILTER: {
  //       ...initialFilterState,
  //       isActive: true,
  //     },
  //   });
  //
  //   render(
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <App/>
  //       </Router>
  //     </Provider>,
  //   );
  //
  // });

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
