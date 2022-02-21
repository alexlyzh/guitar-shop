import {ChangeEvent} from 'react';
import {debounce} from '../../../../../utils/common';
import {debounceDelay} from '../../../../../const/common';

type Props = {
  priceMin?: number,
  priceMax?: number,
  minPriceLimit?: number,
  maxPriceLimit?: number,
  onPriceMinInput: (evt: ChangeEvent<HTMLInputElement>) => void,
  onPriceMaxInput: (evt: ChangeEvent<HTMLInputElement>) => void,
}

function FilterPrice(props: Props): JSX.Element {
  const {priceMin, priceMax, maxPriceLimit, minPriceLimit, onPriceMinInput, onPriceMaxInput} = props;
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
            defaultValue={!priceMin ? '' : priceMin}
            onInput={debounce(onPriceMinInput, debounceDelay.price)}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={!maxPriceLimit ? '' : maxPriceLimit.toString()}
            id="priceMax"
            name="до"
            defaultValue={!priceMax ? '' : priceMax}
            onInput={debounce(onPriceMaxInput, debounceDelay.price)}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
