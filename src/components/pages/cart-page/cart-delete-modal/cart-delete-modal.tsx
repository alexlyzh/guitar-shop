import Modal from '../../../common/modal/modal';
import { Guitar } from '../../../../types/types';
import { guitarType } from '../../../../const/common';

type Props = {
  guitar: Guitar,
  isOpen: boolean,
  onHideModalBtnClick: () => void,
  onRemoveBtnClick: () => void,
}

function CartDeleteModal({guitar, isOpen, onHideModalBtnClick, onRemoveBtnClick}: Props): JSX.Element | null {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onModalClose={onHideModalBtnClick}>
      <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
      <div className="modal__info">
        <img className="modal__img" src={guitar.previewImg} width="67" height="137" alt="Честер bass"/>
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
          <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
          <p className="modal__product-params">{guitarType[guitar.type].typeName}, {guitar.stringCount}-струнная</p>
          <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar.price} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button className="button button--small modal__button" onClick={onRemoveBtnClick}>Удалить товар</button>
        <button
          className="button button--black-border button--small modal__button modal__button--right"
          onClick={onHideModalBtnClick}
        >
          Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}

export default CartDeleteModal;
