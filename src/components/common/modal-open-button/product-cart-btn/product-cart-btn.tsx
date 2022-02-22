import { Link } from 'react-router-dom';
import { ModalOpenBtnProps } from '../modal-open-button';

function ProductCartBtn({onClick}: Omit<ModalOpenBtnProps, 'type'>): JSX.Element {
  return (
    <Link
      className="button button--red button--big product-container__button"
      to="#"
      onClick={onClick}
    >
      Добавить в корзину
    </Link>
  );
}

export default ProductCartBtn;
