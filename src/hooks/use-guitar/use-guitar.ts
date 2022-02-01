import {useGuitars} from '../use-guitars/use-guitars';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {ActionAPI} from '../../store/api-actions/api-actions';

export const useGuitar = (id: number) => {
  const dispatch = useDispatch();
  const {guitars, isErrorLoadingGuitars, isFetchingGuitars} = useGuitars();
  const product = guitars.data.find((guitar) => guitar.id === id);
  const shouldLoadGuitarByID = !isFetchingGuitars && !isErrorLoadingGuitars && !product;

  useEffect(() => {
    if (shouldLoadGuitarByID) {
      dispatch(ActionAPI.getGuitarById(id));
    }
  }, [shouldLoadGuitarByID, id, dispatch]);

  return {product, isErrorLoadingGuitars, isFetchingGuitars};
};
