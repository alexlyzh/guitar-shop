import GuitarCard from './guitar-card';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { getMockGuitarWithComments } from '../../../../../utils/mock';
import { initialCartState } from '../../../../../store/reducer/cart-reducer/cart-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitarWithComments();
    const store = mockStore({ CART: initialCartState });
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarCard guitar={guitar} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('guitar-price').textContent).toMatch(new RegExp(`${guitar.price}`));
    expect(screen.getByTestId('guitar-name').textContent).toBe(guitar.name);
    expect(screen.getByTestId('guitar-rate-count').textContent)
      .toMatch(new RegExp(`${guitar.comments.length}`));
  });
});
