import MainLayout from './main-layout';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { initialCartState } from '../../store/reducer/cart-reducer/cart-reducer';

const CHILDREN = 'This is children';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const store = mockStore({CART: initialCartState});

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainLayout>
            {CHILDREN}
          </MainLayout>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('svg-sprite')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('form-search')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText(CHILDREN)).toBeInTheDocument();
  });
});
