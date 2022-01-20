import {useSelector} from 'react-redux';
import {getGuitars} from '../../store/reducer/data-reducer/selectors';
import {RequestStatus} from '../../types/types';

export const useGuitars = () => {
  const guitars = useSelector(getGuitars);
  const isFetchingGuitars = guitars.requestStatus === RequestStatus.PENDING;
  const isErrorLoadingGuitars = guitars.requestStatus === RequestStatus.ERROR;

  return {guitars, isFetchingGuitars, isErrorLoadingGuitars};
};
