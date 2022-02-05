import dayjs from 'dayjs';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { RemoteData, Comment, Guitar } from '../../../types/types';
import { monthMap } from '../../../const';
import { useReviewFeed } from '../../../hooks/use-review-feed/use-review-feed';
import { scrollToPageTop } from '../../../utils/common';
import ReviewModal from '../review-modal/review-modal';
import StarRating from '../../common/star-rating/star-rating';
import ShowMoreBtn from './show-more-btn/show-more-btn';

const COMMENTS_STEP = 3;

type Props = {
  comments: RemoteData<Comment>,
  product: Guitar,
}

function Reviews({comments, product}: Props): JSX.Element {
  const observerRef = useRef<HTMLButtonElement | null>(null);
  const [reviews, renderNextReviews, isAllRendered] = useReviewFeed(comments, COMMENTS_STEP, observerRef);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <ReviewModal product={product} />

      {reviews.map((comment) => {
        const month = dayjs(comment.createAt).format('MMMM');
        const day = dayjs(comment.createAt).format('D');
        const date = `${day} ${monthMap[month.toLowerCase()]}`;
        return (
          <div className="review" key={comment.id}>
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
              <span className="review__date">{date}</span>
            </div>
            <div className="rate review__rating-panel" aria-hidden="true">
              <StarRating rating={comment.rating} starWidth={16} starHeight={16} />
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">{comment.advantage}</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">{comment.disadvantage}</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">{comment.comment}</p>
          </div>
        );
      })}

      {!isAllRendered ?
        <ShowMoreBtn
          ref={observerRef}
          label={'Показать еще отзывы'}
          onBtnClick={() => renderNextReviews()}
        /> : null}
      {reviews.length ?
        <Link
          className="button button--up button--red-border button--big reviews__up-button"
          style={{zIndex: 1}}
          to="#"
          onClick={scrollToPageTop}
        >
          Наверх
        </Link> : null}
    </section>
  );
}

export default Reviews;
