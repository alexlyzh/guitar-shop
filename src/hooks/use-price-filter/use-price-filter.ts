import {useDispatch} from 'react-redux';
import {ChangeEvent} from 'react';
import {ActionCreator} from '../../store/actions';
import {ActionAPI} from '../../store/api-actions/api-actions';
import {Price} from '../../types/types';

const limitPrice = (value: number, minLimit: number, maxLimit: number) =>
  Math.max(minLimit, Math.min(maxLimit, value));

export const usePriceFilter = (minPriceLimit: Price, maxPriceLimit: Price) => {
  const dispatch = useDispatch();

  const onPriceMinChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    dispatch(ActionCreator.changePriceMin(Number(target.value)));
    dispatch(ActionAPI.updateFilter());
  };

  const onPriceMaxChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    dispatch(ActionCreator.changePriceMax(Number(target.value)));
    dispatch(ActionAPI.updateFilter());
  };

  const onPriceMinBlur = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.value && minPriceLimit && maxPriceLimit) {
      const price = Number(target.value);
      const limitedPrice = limitPrice(price, minPriceLimit, maxPriceLimit);
      dispatch(ActionCreator.changePriceMin(limitedPrice));
      if (price !== limitedPrice) {
        target.value = limitedPrice.toString();
        dispatch(ActionAPI.updateFilter());
      }
    }
  };

  const onPriceMaxBlur = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.value && minPriceLimit && maxPriceLimit) {
      const price = Number(target.value);
      const limitedPrice = limitPrice(price, minPriceLimit, maxPriceLimit);
      dispatch(ActionCreator.changePriceMax(limitedPrice));
      if (price !== limitedPrice) {
        target.value = limitedPrice.toString();
        dispatch(ActionAPI.updateFilter());
      }
    }
  };

  return {
    onPriceMinChange,
    onPriceMaxChange,
    onPriceMinBlur,
    onPriceMaxBlur,
  };
};
