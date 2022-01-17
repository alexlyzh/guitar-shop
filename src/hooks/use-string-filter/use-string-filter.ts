import {useDispatch} from 'react-redux';
import {ActionCreator} from '../../store/actions';
import {ActionAPI} from '../../store/api-actions/api-actions';

export const useStringFilter = () => {
  const dispatch = useDispatch();

  const handleStringFilterChange = (stringCount: number | string) => {
    dispatch(ActionCreator.toggleStringCondition(Number(stringCount)));
    dispatch(ActionAPI.updateFilter());
  };

  return {handleStringFilterChange};
};
