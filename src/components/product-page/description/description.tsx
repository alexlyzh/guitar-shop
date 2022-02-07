import { Guitar } from '../../../types/types';

type Props = {
  product: Guitar,
  label: string,
}

function Description({product, label}: Props): JSX.Element {
  return (
    <p className="tabs__product-description" id={label}>
      {product.description}
    </p>
  );
}

export default Description;
