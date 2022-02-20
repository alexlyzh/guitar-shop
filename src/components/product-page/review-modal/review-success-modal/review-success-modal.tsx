type Props = {
  onButtonClick: () => void,
}

function ReviewSuccessModal({onButtonClick}: Props): JSX.Element {
  return (
    <>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"/>
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button className="button button--small modal__button modal__button--review"
          onClick={onButtonClick}
        >
          К покупкам!
        </button>
      </div>
    </>
  );
}

export default ReviewSuccessModal;
