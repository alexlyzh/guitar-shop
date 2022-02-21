import FilterString from './filter-string';
import {stringOptions} from '../../../../const/common';
import {initialFilterState} from '../../../../store/reducer/filter-reducer/filter-reducer';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();

describe('Component: FilterType', () => {
  it('should render correctly', () => {
    const store = mockStore({
      FILTER: initialFilterState,
    });

    render(
      <Provider store={store}>
        <FilterString
          types={[]}
          selectedStrings={stringOptions}
          availableStringsForSelectedTypes={stringOptions}
        />
      </Provider>);

    expect(screen.getByText('Количество струн')).toBeInTheDocument();
    stringOptions.forEach((stringsCount) => {
      expect(screen.getByLabelText(stringsCount)).toBeInTheDocument();
    });
  });
});
