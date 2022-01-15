import FilterContainer from './filter-container';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {initialFilterState} from '../../../store/reducer/filter-reducer/filter-reducer';
import {AppMessage} from '../../../const';

const mockStore = configureMockStore();

describe('Component: FilterContainer', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        priceRange: {
          min: null,
          max: null,
        },
      },
      FILTER: initialFilterState,
    });

    render(
      <Provider store={store}>
        <FilterContainer />
      </Provider>);

    expect(screen.getByText(new RegExp(`${AppMessage.CatalogFilterHeading}`))).toBeInTheDocument();
    expect(screen.getByLabelText('filter-price')).toBeInTheDocument();
    expect(screen.getByLabelText('filter-type')).toBeInTheDocument();
    expect(screen.getByLabelText('filter-string')).toBeInTheDocument();
  });
});
