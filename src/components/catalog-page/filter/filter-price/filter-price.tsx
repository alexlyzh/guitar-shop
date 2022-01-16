import {ChangeEvent} from 'react';
import {debounce} from '../../../../utils/common';
import {debounceDelay} from '../../../../const';
import {Price} from '../../../../types/types';

type Props = {
  minPriceLimit: Price,
  maxPriceLimit: Price,
  onPriceMinChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onPriceMaxChange: (evt: ChangeEvent<HTMLInputElement>) => void,
}

function FilterPrice(props: Props): JSX.Element {
  const {maxPriceLimit, minPriceLimit, onPriceMinChange, onPriceMaxChange} = props;
  return (
    <fieldset className="catalog-filter__block" aria-label="filter-price">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={!minPriceLimit ? '' : minPriceLimit.toString()}
            id="priceMin"
            name="от"
            onChange={debounce(onPriceMinChange, debounceDelay.price)}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={!maxPriceLimit ? '' : maxPriceLimit.toString()}
            id="priceMax"
            name="до"
            onChange={debounce(onPriceMaxChange, debounceDelay.price)}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
