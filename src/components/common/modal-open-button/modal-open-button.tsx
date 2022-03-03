import ReviewBtn from './review-btn/review-btn';
import ProductCartBtn from './product-cart-btn/product-cart-btn';
import CatalogCartBtn from './catalog-cart-btn/catalog-cart-btn';
import { ModalType } from '../../../types/types';

export type ModalOpenBtnProps = {
  type: ModalType,
  isInCart?: boolean,
  onClick?: () => void,
}

export const buttonByModalType = {
  review: ReviewBtn,
  productCart: ProductCartBtn,
  catalogCart: CatalogCartBtn,
};

export default function ModalOpenButton({type, isInCart, onClick}: ModalOpenBtnProps): JSX.Element {
  const Button = buttonByModalType[type];
  return <Button isInCart={isInCart} onClick={onClick} />;
}
