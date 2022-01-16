import {useDispatch, useSelector} from 'react-redux';
import {getGuitars} from '../../store/reducer/data-reducer/selectors';
import {RequestStatus} from '../../types/types';
import {useEffect} from 'react';
import {ActionAPI} from '../../store/api-actions/api-actions';

export const useAllGuitars = () => {
  const dispatch = useDispatch();
  const guitars = useSelector(getGuitars);
  const shouldLoadGuitars = guitars.requestStatus === RequestStatus.IDLE;
  const isFetchingGuitars = guitars.requestStatus === RequestStatus.PENDING;
  const isErrorLoadingGuitars = guitars.requestStatus === RequestStatus.ERROR;

  useEffect(() => {
    if (shouldLoadGuitars) {
      dispatch(ActionAPI.getAllGuitars());
    }
  }, [shouldLoadGuitars, dispatch]);

  return {guitars, isFetchingGuitars, isErrorLoadingGuitars};
};
