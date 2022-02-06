import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import { ActionCreator } from '../../store/actions';
import { getCurrentFilter } from '../../store/reducer/filter-reducer/selectors';

type PriceChangeAction = ReturnType<typeof ActionCreator.setPriceMax> | ReturnType<typeof ActionCreator.setPriceMin>;
type PriceChangeActionCreator = (price?: number) => PriceChangeAction;

const limitPrice = (value: number, minLimit: number, maxLimit: number) =>
  Math.max(minLimit, Math.min(maxLimit, value));

export const usePriceFilter = (minPriceLimit?: number, maxPriceLimit?: number) => {
  const dispatch = useDispatch();
  const {priceMin, priceMax} = useSelector(getCurrentFilter);

  const handlePriceChange = (
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
      return;
    }
    dispatch(callback());
  };

  const onPriceMinInput = (evt: ChangeEvent<HTMLInputElement>) =>
    handlePriceChange(evt, ActionCreator.setPriceMin);

  const onPriceMaxInput = (evt: ChangeEvent<HTMLInputElement>) =>
    handlePriceChange(evt, ActionCreator.setPriceMax);

  return {
    priceMin,
    priceMax,
    onPriceMinInput,
    onPriceMaxInput,
  };
};
