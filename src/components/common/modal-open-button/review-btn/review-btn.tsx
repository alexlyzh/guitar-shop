import { Link } from 'react-router-dom';

type Props = {
  onClick: () => void;
}

function ReviewBtn({onClick}: Props): JSX.Element {
  return (
    <Link
      className="button button--red-border button--big reviews__submit-button"
      to="#"
      onClick={onClick}
      aria-label="open review form"
    >
      Оставить отзыв
    </Link>
  );
}

export default ReviewBtn;
