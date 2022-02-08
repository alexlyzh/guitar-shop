import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { GuitarWithComments } from '../../../types/types';
import { useReviewFeed } from '../../../hooks/use-review-feed/use-review-feed';
import { scrollToPageTop } from '../../../utils/common';
import ReviewModal from '../review-modal/review-modal';
import ShowMoreBtn from './show-more-btn/show-more-btn';
import ReviewList from './review-list/review-list';

const COMMENTS_STEP = 3;

type Props = {
  product: GuitarWithComments,
}

function ReviewsContainer({product}: Props): JSX.Element {
  const observerRef = useRef<HTMLButtonElement | null>(null);
  const [reviews, renderNextReviews, isAllRendered] = useReviewFeed(product.comments, COMMENTS_STEP, observerRef);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <ReviewModal product={product} />

      <ReviewList reviews={reviews} />

      {!isAllRendered ?
        <ShowMoreBtn
          ref={observerRef}
          label={'Показать еще отзывы'}
          onBtnClick={renderNextReviews}
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

export default ReviewsContainer;
