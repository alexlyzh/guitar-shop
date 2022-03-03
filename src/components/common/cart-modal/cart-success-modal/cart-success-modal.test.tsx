import CartSuccessModal from './cart-success-modal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: CartSuccessModal', () => {
  it('should render and call handlers correctly', () => {
    const onCloseBtnClick = jest.fn();
    const onRedirectBtnClick = jest.fn();
    render(
      <CartSuccessModal
        onCloseBtnClick={onCloseBtnClick}
        onRedirectBtnClick={onRedirectBtnClick}
      />,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Перейти в корзину/i }));
    expect(onRedirectBtnClick).toBeCalled();
    userEvent.click(screen.getByRole('button', { name: /Продолжить покупки/i }));
    expect(onCloseBtnClick).toBeCalled();
  });
});
