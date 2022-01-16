import {useDispatch, useSelector} from 'react-redux';
import {getCurrentSort} from '../../store/reducer/sort-reducer/selectors';
import {SortSettings} from '../../store/reducer/sort-reducer/sort-reducer';
import {ActionAPI} from '../../store/api-actions/api-actions';

export const useSort = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector(getCurrentSort);

  const changeSort = (update: SortSettings) => {
    dispatch(ActionAPI.updateSort(update));
  };

  return {currentSort, changeSort};
};
