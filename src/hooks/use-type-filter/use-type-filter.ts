import { ActionAPI } from '../../store/api-actions/api-actions';
import { useDispatch } from 'react-redux';
import { ActionCreator } from '../../store/actions';

export const useTypeFilter = () => {
  const dispatch = useDispatch();

  const handleGuitarTypeChange = (type: string) => {
    dispatch(ActionCreator.toggleTypeCondition(type));
    dispatch(ActionAPI.updateFilter());
  };

  return {handleGuitarTypeChange};
};
