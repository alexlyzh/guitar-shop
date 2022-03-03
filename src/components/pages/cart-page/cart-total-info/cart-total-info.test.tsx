import CartTotalInfo from './cart-total-info';
import { render, screen } from '@testing-library/react';
import { getMockGuitar } from '../../../../utils/mock';
import { getRandomInteger } from '../../../../utils/common';
import { RequestStatus } from '../../../../types/types';

describe('Component: CartTotalInfo', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitar();
    const count = getRandomInteger(1, 5);
    const totalCartPrice = guitar.price * count;
    const discount = {
      size: 0.25,
      coupon: '',
      requestStatus: RequestStatus.IDLE,
    };
    const shouldHighlightDiscount = Boolean(totalCartPrice) && discount.size !== 0;

    render(
      <CartTotalInfo
        cartItems={[{guitar, count}]}
        totalCartPrice={totalCartPrice}
        discount={discount}
        shouldHighlightDiscount={shouldHighlightDiscount}
      />,
    );

    expect(screen.getByText(new RegExp(`${totalCartPrice}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${-discount.size * totalCartPrice}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${Math.max(0, totalCartPrice - totalCartPrice * discount.size)}`))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /оформить заказ/i })).toBeInTheDocument();
  });
});
