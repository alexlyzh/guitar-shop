type Props = {
  onModalClose: () => void,
  onRedirect: () => void,
}

function CartSuccessModal({onModalClose, onRedirect}: Props): JSX.Element {
  return (
    <>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"/>
      </svg>
      <p className="modal__message">Товар успешно добавлен в корзину</p>
      <div className="modal__button-container modal__button-container--add">
        <button className="button button--small modal__button" onClick={onRedirect}>Перейти в корзину</button>
        <button
          className="button button--black-border button--small modal__button modal__button--right"
          onClick={onModalClose}
        >
          Продолжить покупки
        </button>
      </div>
    </>
  );
}

export default CartSuccessModal;
