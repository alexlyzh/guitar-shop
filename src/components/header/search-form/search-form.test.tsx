import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import SearchForm from './search-form';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <SearchForm
          search={''}
          onInputChange={jest.fn}
          foundGuitars={[]}
          isDropdownVisible={false}
        />
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/что вы ищите/)).toBeInTheDocument();
  });

  it('should call onInputChange', () => {
    const onInputChange = jest.fn();
    const store = mockStore();
    render(
      <Provider store={store}>
        <SearchForm
          search={''}
          onInputChange={onInputChange}
          foundGuitars={[]}
          isDropdownVisible={false}
        />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/что вы ищите/);
    userEvent.type(searchInput, 'X');
    expect(onInputChange).toBeCalledWith('X');
  });
});
