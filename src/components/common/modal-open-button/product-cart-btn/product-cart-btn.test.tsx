import ProductCartBtn from './product-cart-btn';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { getRandomInteger } from '../../../../utils/common';

describe('Component: CatalogCartBtn', () => {
  it('should render and call onClick', () => {
    const onClick = jest.fn();
    const isInCart = Boolean(getRandomInteger());

    render(
      <Router history={createMemoryHistory()}>
        <ProductCartBtn isInCart={isInCart} onClick={onClick} />
      </Router>,
    );

    const btn = screen.getByText(/Добавить в корзину/i);
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(onClick).toBeCalled();
  });
});
