import { Link } from 'react-router-dom';

type Props = {
  onClick: () => void;
}

function ProductCartBtn({onClick}: Props): JSX.Element {
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
