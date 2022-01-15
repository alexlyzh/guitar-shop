import {mockGuitarsWithComments} from '../../utils/mock';
import {RequestStatus} from '../../types/types';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import CatalogPage from './catalog-page';
import {initialSortState} from '../../store/reducer/sort-reducer/sort-reducer';
import {initialFilterState} from '../../store/reducer/filter-reducer/filter-reducer';
import {AppMessage} from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const {guitars, comments} = mockGuitarsWithComments();
    const store = mockStore({
      DATA: {
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: guitars,
        },
        priceRange: {
          min: null,
          max: null,
        },
        comments,
      },
      SORT: initialSortState,
      FILTER: initialFilterState,
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
