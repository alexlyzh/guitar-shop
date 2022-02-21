import { Link } from 'react-router-dom';

type Props = {
  onClick: () => void;
}

function CatalogCartBtn({onClick}: Props): JSX.Element {
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

export default CatalogCartBtn;
