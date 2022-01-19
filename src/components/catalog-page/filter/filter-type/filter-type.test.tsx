import FilterType from './filter-type';
import {render, screen} from '@testing-library/react';
import {GuitarType} from '../../../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {initialFilterState} from '../../../../store/reducer/filter-reducer/filter-reducer';

const mockStore = configureMockStore();

describe('Component: FilterType', () => {
  it('should render correctly', () => {
    const store = mockStore({
      FILTER: initialFilterState,
    });
    render(
      <Provider store={store}>
        <FilterType types={['mock']} />
      </Provider>);

    expect(screen.getByText('Тип гитар')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${GuitarType.acoustic}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${GuitarType.ukulele}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${GuitarType.electric}`))).toBeInTheDocument();
  });
});
