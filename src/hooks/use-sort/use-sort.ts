import {useDispatch, useSelector} from 'react-redux';
import {getCurrentSort} from '../../store/reducer/sort-reducer/selectors';
import {ActionAPI} from '../../store/api-actions/api-actions';
import {SortOrder, SortType} from '../../const/common';

export const useSort = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector(getCurrentSort);

  const setTypePriceSort = () => {
    dispatch(ActionAPI.updateSort({type: SortType.PRICE}));
  };

  const setTypeRatingSort = () => {
    dispatch(ActionAPI.updateSort({type: SortType.RATING}));
  };

  const setAscendingOrderSort = () => {
    dispatch(ActionAPI.updateSort({order: SortOrder.ASC}));
  };

  const setDescendingOrderSort = () => {
    dispatch(ActionAPI.updateSort({order: SortOrder.DESC}));
  };

  return {currentSort, setAscendingOrderSort, setDescendingOrderSort, setTypePriceSort, setTypeRatingSort};
};
