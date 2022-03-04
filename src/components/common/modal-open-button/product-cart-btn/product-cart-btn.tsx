import { Link } from 'react-router-dom';
import { ModalOpenBtnProps } from '../modal-open-button';

function ProductCartBtn({onLinkClick}: Omit<ModalOpenBtnProps, 'type'>): JSX.Element {
  return (
    <Link
      className="button button--red button--big product-container__button"
      to="#"
      aria-label="open cart modal"
      role="modal-open-button"
      onClick={onLinkClick}
    >
      Добавить в корзину
    </Link>
  );
}

export default ProductCartBtn;
