import CartDeleteModal from './cart-delete-modal';
import { render, screen } from '@testing-library/react';
import { getMockGuitar } from '../../../../utils/mock';
import userEvent from '@testing-library/user-event';
import { guitarType } from '../../../../const/common';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('Component: CartDeleteModal', () => {
  it('should render and call handlers correctly', () => {
    const guitar = getMockGuitar();
    const onHideModalBtnClick = jest.fn();
    const onRemoveBtnClick = jest.fn();
    render(
      <CartDeleteModal
        guitar={guitar}
        isOpen
        onHideModalBtnClick={onHideModalBtnClick}
        onRemoveBtnClick={onRemoveBtnClick}
      />,
    );

    expect(screen.getByText(/удалить этот товар/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitarType[guitar.type].typeName}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.vendorCode}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.stringCount}-струнная`, 'i'))).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /удалить товар/i }));
    expect(onRemoveBtnClick).toBeCalled();
    userEvent.click(screen.getByRole('button', { name: /продолжить покупки/i }));
    expect(onHideModalBtnClick).toBeCalled();
  });
});
