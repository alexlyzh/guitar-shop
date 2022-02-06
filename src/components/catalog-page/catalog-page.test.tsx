import CatalogPage from './catalog-page';
import { mockGuitarsWithComments } from '../../utils/mock';
import { RequestStatus } from '../../types/types';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { initialAppState } from '../../store/reducer/app-reducer/app-reducer';
import { initialDataState } from '../../store/reducer/data-reducer/data-reducer';
import { initialSortState } from '../../store/reducer/sort-reducer/sort-reducer';
import { initialFilterState } from '../../store/reducer/filter-reducer/filter-reducer';
import { AppMessage } from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const {guitars, comments} = mockGuitarsWithComments();
    const store = mockStore({
      APP: {
        ...initialAppState,
        isCatalogInitialized: true,
      },
      DATA: {
        ...initialDataState,
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: guitars,
        },
        comments,
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
          <CatalogPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(`${AppMessage.CatalogPageHeading}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${AppMessage.CatalogFilterHeading}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${AppMessage.CatalogSortHeading}`))).toBeInTheDocument();
    expect(screen.getByTestId('guitar-cards')).toBeInTheDocument();
  });
});
