import {Link} from 'react-router-dom';
import {RemoteData, Comment} from '../../../types/types';
import StarRating from '../../common/star-rating/star-rating';
import dayjs from 'dayjs';
import {monthMap} from '../../../const';

// const COMMENTS_STEP = 3;

type Props = {
  comments: RemoteData<Comment>,
}

function Reviews({comments}: Props): JSX.Element {
  const sortedComments = [...comments.data].sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link className="button button--red-border button--big reviews__sumbit-button" to="#">Оставить отзыв</Link>
      {sortedComments.map((comment) => {
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
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
      <Link className="button button--up button--red-border button--big reviews__up-button" to="#header" style={{zIndex: 1}}>
        Наверх
      </Link>
    </section>
  );
}

export default Reviews;
