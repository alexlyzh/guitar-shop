import {useDispatch} from 'react-redux';
import {ChangeEvent} from 'react';
import {ActionCreator} from '../../store/actions';
import {ActionAPI} from '../../store/api-actions/api-actions';
import {Price} from '../../types/types';

type PriceChangeAction = ReturnType<typeof ActionCreator.changePriceMax> | ReturnType<typeof ActionCreator.changePriceMin>;
type PriceChangeActionCreator = (price: Price) => PriceChangeAction;

const limitPrice = (value: number, minLimit: number, maxLimit: number) =>
  Math.max(minLimit, Math.min(maxLimit, value));

export const usePriceFilter = (minPriceLimit: Price, maxPriceLimit: Price) => {
  const dispatch = useDispatch();

  const onPriceInputElementChange = (
    {target}: ChangeEvent<HTMLInputElement>,
    callback: PriceChangeActionCreator,
  ) => {
    if (target.value && minPriceLimit && maxPriceLimit) {
      const price = Number(target.value);
      const limitedPrice = limitPrice(price, minPriceLimit, maxPriceLimit);
      dispatch(callback(limitedPrice));
      if (price !== limitedPrice) {
        target.value = limitedPrice.toString();
      }
      dispatch(ActionAPI.updateFilter());
      return;
    }
    dispatch(callback(null));
    dispatch(ActionAPI.updateFilter());
  };

  const onPriceMinChange = (evt: ChangeEvent<HTMLInputElement>) =>
    onPriceInputElementChange(evt, ActionCreator.changePriceMin);

  const onPriceMaxChange = (evt: ChangeEvent<HTMLInputElement>) =>
    onPriceInputElementChange(evt, ActionCreator.changePriceMax);

  return {
    onPriceMinChange,
    onPriceMaxChange,
  };
};
