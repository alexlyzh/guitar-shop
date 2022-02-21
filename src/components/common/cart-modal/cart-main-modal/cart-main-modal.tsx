import { guitarType } from '../../../../const/common';
import { Guitar } from '../../../../types/types';

type Props = {
  product: Guitar,
}

function CartMainModal({product}: Props): JSX.Element {
  return (
    <>
      <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
      <div className="modal__info">
        <img className="modal__img" src={`${product.previewImg}`} width="67" height="137" alt="Честер bass"/>
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">Гитара {product.name}</h3>
          <p className="modal__product-params modal__product-params--margin-11">Артикул: {product.vendorCode}</p>
          <p className="modal__product-params">{guitarType[product.type].typeName}, {product.stringCount}-струнная</p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">{product.price} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button className="button button--red button--big modal__button modal__button--add">Добавить в корзину</button>
      </div>
    </>
  );
}

export default CartMainModal;
