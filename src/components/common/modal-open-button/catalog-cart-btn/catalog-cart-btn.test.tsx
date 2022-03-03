import CatalogCartBtn from './catalog-cart-btn';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { getRandomInteger } from '../../../../utils/common';

describe('Component: CatalogCartBtn', () => {
  it('should render and call onClick', () => {
    const onClick = jest.fn();
    const isInCart = Boolean(getRandomInteger());
    const btnLabel = isInCart ? 'В Корзине' : 'Купить';

    render(
      <Router history={createMemoryHistory()}>
        <CatalogCartBtn isInCart={isInCart} onClick={onClick} />
      </Router>,
    );

    expect(screen.getByText(btnLabel)).toBeInTheDocument();
    userEvent.click(screen.getByText(btnLabel));
    expect(onClick).toBeCalled();
  });
});
