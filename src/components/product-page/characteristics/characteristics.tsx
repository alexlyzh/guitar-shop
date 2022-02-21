import { guitarType } from '../../../const/common';
import { Guitar } from '../../../types/types';

type Props = {
  product: Guitar,
  label: string,
}

function Characteristics({product, label}: Props): JSX.Element {
  return (
    <table className="tabs__table" id={label}>
      <tbody>
        <tr className="tabs__table-row">
          <td className="tabs__title">Артикул:</td>
          <td className="tabs__value">{product.vendorCode}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Тип:</td>
          <td className="tabs__value">{guitarType[product.type].typeName}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Количество струн:</td>
          <td className="tabs__value">{product.stringCount}-струнная</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Characteristics;
