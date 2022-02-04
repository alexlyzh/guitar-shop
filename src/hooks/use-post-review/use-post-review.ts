import { CommentPost, ReviewFormState } from '../../types/types';
import { useDispatch } from 'react-redux';
import { FormEvent } from 'react';
import { ActionAPI } from '../../store/api-actions/api-actions';

const adaptFormData = (guitarId: number, data: ReviewFormState) => ({
  guitarId,
  userName: data['user-name'],
  advantage: data.advantage,
  disadvantage: data.disadvantage,
  comment: data.review,
  rating: Number(data.rate),
}) as CommentPost;

export const usePostReview = (id: number, data: ReviewFormState) => {
  const dispatch = useDispatch();
  const isDataValid = Boolean(data['user-name'] && data.rate);

  const postReview = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    isDataValid && dispatch(ActionAPI.postComment(adaptFormData(id, data)));
  };

  return [isDataValid, postReview] as [boolean, (evt: FormEvent<HTMLFormElement>) => void];
};
