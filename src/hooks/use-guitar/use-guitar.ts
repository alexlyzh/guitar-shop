import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGuitars } from '../use-guitars/use-guitars';
import { ActionAPI } from '../../store/api-actions/api-actions';
import { ActionCreator } from '../../store/actions';

export const useGuitar = (id: number) => {
  const dispatch = useDispatch();
  const {guitars, isErrorLoadingGuitars, isFetchingGuitars} = useGuitars();
  const product = guitars.data.find((guitar) => guitar.id === id);
  const shouldLoadGuitar = !isFetchingGuitars && !isErrorLoadingGuitars && !product;

  useEffect(() => {
    if (shouldLoadGuitar) {
      dispatch(ActionAPI.getGuitarById(id));
      dispatch(ActionCreator.setFilterActivity(false));
    }
  }, [shouldLoadGuitar, id, dispatch]);

  return {product, isErrorLoadingGuitars, isFetchingGuitars};
};
