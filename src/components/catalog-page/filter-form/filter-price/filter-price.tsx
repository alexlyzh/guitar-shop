import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent} from 'react';
import {debounce} from '../../../../utils';
import {ActionCreator} from '../../../../store/actions';
import {getCatalogPriceRange} from '../../../../store/reducer/data-reducer/selectors';
import {ActionAPI} from '../../../../store/api-actions/api-actions';
import {DEBOUNCE_DELAY} from '../../../../const';

const limitPrice = (value: number, minLimit: number, maxLimit: number) =>
  Math.max(minLimit, Math.min(maxLimit, value));


function FilterPrice(): JSX.Element {
  const dispatch = useDispatch();
  const {min : minPriceLimit, max : maxPriceLimit} = useSelector(getCatalogPriceRange);

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

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={!minPriceLimit ? '' : minPriceLimit.toString()}
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
            placeholder={!maxPriceLimit ? '' : maxPriceLimit.toString()}
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
