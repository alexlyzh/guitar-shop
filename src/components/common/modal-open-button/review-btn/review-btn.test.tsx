import ReviewBtn from './review-btn';
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
        <ReviewBtn isInCart={isInCart} onLinkClick={onClick} />
      </Router>,
    );

    const btn = screen.getByText(/оставить отзыв/i);
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(onClick).toBeCalled();
  });
});
