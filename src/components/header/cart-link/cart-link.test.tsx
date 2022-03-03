import CartLink from './cart-link';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { initialCartState } from '../../../store/reducer/cart-reducer/cart-reducer';
import { getRandomInteger } from '../../../utils/common';
import { getMockGuitar } from '../../../utils/mock';
import { AppPath } from '../../../const/app-routes';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
history.push(AppPath.catalog);

const mockStore = configureMockStore();

describe('Component: CartLink', () => {
  it('should render and redirect to cart page', () => {
    const guitar = getMockGuitar();
    const count = getRandomInteger(1, 5);

    const store = mockStore({
      CART: {
        ...initialCartState,
        items: [{ guitar, count }],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppPath.catalog} component={CartLink} />
            <Route exact path={AppPath.cart}>
              This is cart page
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByLabelText('items in cart').textContent).toEqual(count.toString());
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/this is cart page/i)).toBeInTheDocument();
  });
});
