import CartProductList from './cart-product-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { getRandomInteger } from '../../../../utils/common';
import { getMockGuitar } from '../../../../utils/mock';

const mockStore = configureMockStore();

describe('Component: CartProductList', () => {
  it('should render correctly', () => {
    const cartItems = new Array(getRandomInteger(2,5)).fill(null).map((item) => ({
      guitar: getMockGuitar(),
      count: 1,
    }));

    render(
      <Provider store={mockStore()}>
        <CartProductList cartItems={cartItems} />
      </Provider>,
    );

    expect(screen.getAllByLabelText(/cart product/i)).toHaveLength(cartItems.length);
  });
});
