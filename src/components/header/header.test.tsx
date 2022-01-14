import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Header from './header';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('form-search')).toBeInTheDocument();
    expect(screen.getByText(/в корзину/)).toBeInTheDocument();
  });
});
