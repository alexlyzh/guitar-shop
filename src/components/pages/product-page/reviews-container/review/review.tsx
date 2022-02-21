import StarRating from '../../../../common/star-rating/star-rating';
import { Comment } from '../../../../../types/types';
import { formatDate } from './utils';

type Props = {
  review: Comment,
}

function Review({review}: Props): JSX.Element {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4>
        <span className="review__date">{ formatDate(review.createAt) }</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <StarRating rating={review.rating} starWidth={16} starHeight={16} />
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{review.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{review.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{review.comment}</p>
    </div>
  );
}

export default Review;
