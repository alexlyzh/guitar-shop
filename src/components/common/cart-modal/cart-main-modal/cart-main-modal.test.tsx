import CartMainModal from './cart-main-modal';
import { render, screen } from '@testing-library/react';
import { getMockGuitarWithComments } from '../../../../utils/mock';
import { guitarType } from '../../../../const/common';

describe('Component: CartMainModal', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitarWithComments();
    const onAddToCartBtnClick = jest.fn();
    render(<CartMainModal product={guitar} onAddToCartBtnClick={onAddToCartBtnClick} />);

    expect(screen.getByText(new RegExp(`${guitar.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitarType[guitar.type].typeName}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.vendorCode}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${guitar.stringCount}-струнная`, 'i'))).toBeInTheDocument();
  });
});
