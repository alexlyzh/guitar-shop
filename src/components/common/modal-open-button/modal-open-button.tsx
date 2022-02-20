import ReviewBtn from './review-btn/review-btn';
import ProductAddToCartBtn from './product-add-to-cart-btn/product-add-to-cart-btn';
import CatalogAddToCartBtn from './catalog-add-to-cart-btn/catalog-add-to-cart-btn';
import { ModalType } from '../../../types/types';

const buttonByModalType = {
  review: ReviewBtn,
  productAddToCart: ProductAddToCartBtn,
  catalogAddToCart: CatalogAddToCartBtn,
};

type Props = {
  type: ModalType,
  onClick: () => void,
}

export default function ModalOpenButton({type, onClick}: Props): JSX.Element {
  const CurrentButton = buttonByModalType[type];
  return <CurrentButton onClick={onClick} />;
}
