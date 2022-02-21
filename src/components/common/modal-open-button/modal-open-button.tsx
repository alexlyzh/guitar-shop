import ReviewBtn from './review-btn/review-btn';
import ProductCartBtn from './product-cart-btn/product-cart-btn';
import CatalogCartBtn from './catalog-cart-btn/catalog-cart-btn';
import { ModalType } from '../../../types/types';

const buttonByModalType = {
  review: ReviewBtn,
  productCart: ProductCartBtn,
  catalogCart: CatalogCartBtn,
};

type Props = {
  type: ModalType,
  onClick: () => void,
}

export default function ModalOpenButton({type, onClick}: Props): JSX.Element {
  const CurrentButton = buttonByModalType[type];
  return <CurrentButton onClick={onClick} />;
}
