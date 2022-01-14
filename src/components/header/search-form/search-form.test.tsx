import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import SearchForm from './search-form';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <SearchForm/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });
});
