import {Guitar} from '../../types/types';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '../../store/reducer/data-reducer/selectors';
import {useEffect} from 'react';
import {ActionAPI} from '../../store/api-actions/api-actions';

export const useComments = (guitars: Guitar[], id?: number) => {
  const dispatch = useDispatch();
  const comments = useSelector(getComments);

  useEffect(() => {
    guitars.forEach((guitar) => {
      if (!comments[guitar.id]) {
        dispatch(ActionAPI.getComments(guitar.id));
      }
    });
  }, [guitars, comments, dispatch]);

  useEffect(() => {
    if (id && !comments[id]) {
      dispatch(ActionAPI.getComments(id));
    }
  }, [id, comments, dispatch]);

  return comments;
};
