import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent} from 'react';
import {debounce} from '../../../../utils';
import {ActionCreator} from '../../../../store/actions';
import {FilterSettings} from '../../../../store/reducer/data-reducer/data-reducer';
import {getCatalogPriceRange} from '../../../../store/reducer/data-reducer/selectors';
import {APIAction} from '../../../../store/api-actions';
import {DEBOUNCE_DELAY} from '../../../../const';

type Props = {
  isFetchingData: boolean,
  currentFilter: FilterSettings
}

const limitPrice = (value: number, minLimit: number, maxLimit: number) =>
  Math.max(minLimit, Math.min(maxLimit, value));


function FilterPrice({isFetchingData, currentFilter}: Props): JSX.Element {
  const dispatch = useDispatch();
  const {min : minPriceLimit, max : maxPriceLimit} = useSelector(getCatalogPriceRange);

  const onPriceMinChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    dispatch(ActionCreator.changePriceMin(Number(target.value)));
    dispatch(APIAction.updateFilter());
  };

  const onPriceMaxChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    dispatch(ActionCreator.changePriceMax(Number(target.value)));
    dispatch(APIAction.updateFilter());
  };

  const onPriceMinBlur = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.value && minPriceLimit && maxPriceLimit) {
      const price = Number(target.value);
      const limitedPrice = limitPrice(price, minPriceLimit, maxPriceLimit);
      dispatch(ActionCreator.changePriceMin(limitedPrice));
      if (price !== limitedPrice) {
        target.value = limitedPrice.toString();
        dispatch(APIAction.updateFilter());
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
        dispatch(APIAction.updateFilter());
      }
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={isFetchingData ? '' : minPriceLimit?.toString()}
            id="priceMin"
            name="от"
            onChange={debounce(onPriceMinChange, DEBOUNCE_DELAY)}
            onBlur={onPriceMinBlur}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={isFetchingData ? '' : maxPriceLimit?.toString()}
            id="priceMax"
            name="до"
            onChange={debounce(onPriceMaxChange, DEBOUNCE_DELAY)}
            onBlur={onPriceMaxBlur}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
