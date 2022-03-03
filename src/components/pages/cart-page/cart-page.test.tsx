import CartPage from './cart-page';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { initialCartState } from '../../../store/reducer/cart-reducer/cart-reducer';

const store = configureMockStore()({ CART: initialCartState });

describe('Component: CartPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={createMemoryHistory()}>
          <CartPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByLabelText('product list')).toBeInTheDocument();
    expect(screen.getByLabelText('cart total info')).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
  });
});
