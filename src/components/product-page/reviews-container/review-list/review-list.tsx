import Review from '../review/review';
import { Comment } from '../../../../types/types';

type Props = {
  reviews: Comment[],
}

function ReviewList({reviews}: Props): JSX.Element {
  return (
    <>
      {reviews.map((comment) => <Review review={comment} key={comment.id}/>)}
    </>
  );
}

export default ReviewList;
