import {Guitar} from '../../../types/types';
import {tabLabel} from '../../../const';

type Props = {
  product: Guitar,
  label: keyof typeof tabLabel,
}

function Description({product, label}: Props): JSX.Element {
  return (
    <p className="tabs__product-description" id={label}>
      {product.description}
    </p>
  );
}

export default Description;
