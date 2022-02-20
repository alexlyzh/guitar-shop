import { Link } from 'react-router-dom';

type Props = {
  onClick: () => void;
}

function CatalogAddToCartBtn({onClick}: Props): JSX.Element {
  return (
    <Link
      className="button button--red button--mini button--add-to-cart"
      to="#"
      onClick={onClick}
    >
      Купить
    </Link>
  );
}

export default CatalogAddToCartBtn;
