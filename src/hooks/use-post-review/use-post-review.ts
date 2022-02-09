import { CommentPost, ReviewFormState } from '../../types/types';
import { useDispatch } from 'react-redux';
import { FormEvent, useState, Dispatch, SetStateAction } from 'react';
import { ActionAPI } from '../../store/api-actions/api-actions';

type HooKReturnType = [boolean, boolean, Dispatch<SetStateAction<boolean>>,(evt: FormEvent<HTMLFormElement>) => void]

const adaptFormData = (guitarId: number, data: ReviewFormState) => ({
  guitarId,
  userName: data['user-name'],
  advantage: data.advantage,
  disadvantage: data.disadvantage,
  comment: data.review,
  rating: Number(data.rate),
}) as CommentPost;

export const usePostReview = (
  id: number,
  data: ReviewFormState,
  onSubmitSuccess?: () => void,
): HooKReturnType => {
  const dispatch = useDispatch();
  const [hasFormBeenSent, setHasFormBeenSent] = useState<boolean>(false);
  const shouldShowUsernameWarning = hasFormBeenSent && !data['user-name'];
  const shouldShowRateWarning = hasFormBeenSent && !data.rate;

  const postReview = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setHasFormBeenSent(true);
    dispatch(ActionAPI.postComment(adaptFormData(id, data), onSubmitSuccess));
  };

  return [shouldShowUsernameWarning, shouldShowRateWarning, setHasFormBeenSent, postReview];
};
