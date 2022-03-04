import { Link } from 'react-router-dom';
import { ModalOpenBtnProps } from '../modal-open-button';

function ReviewBtn({onLinkClick}: Omit<ModalOpenBtnProps, 'type'>): JSX.Element {
  return (
    <Link
      className="button button--red-border button--big reviews__submit-button"
      to="#"
      aria-label="open review modal"
      role="modal-open-button"
      onClick={onLinkClick}
    >
      Оставить отзыв
    </Link>
  );
}

export default ReviewBtn;
