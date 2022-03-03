import CartProduct from './cart-product';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { getMockGuitar } from '../../../../utils/mock';
import { getRandomInteger } from '../../../../utils/common';
import { guitarType } from '../../../../const/common';

const mockStore = configureMockStore();

describe('Component: CartProduct', () => {
  it('should render correctly', () => {
    const store = mockStore();
    const guitar = getMockGuitar();
    const count = getRandomInteger(1, 99);
    const totalPrice = guitar.price * count;

    render(
      <Provider store={store}>
        <CartProduct cartItem={{guitar, count}} />
      </Provider>,
    );

    expect(screen.getByText(new RegExp(`${guitarType[guitar.type].typeName} ${guitar.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.vendorCode}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${totalPrice}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.stringCount}-струнная`, 'i'))).toBeInTheDocument();
  });
});
