import {FilterSettings} from '../../../../store/reducer/app-reducer/app-reducer';
// import {useDispatch} from 'react-redux';

type Props = {
  isFetchingData: boolean,
  currentFilter: FilterSettings
}

function FilterPrice({isFetchingData, currentFilter}: Props): JSX.Element {
  // const dispatch = useDispatch();
  const {minPrice, maxPrice} = currentFilter;

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={isFetchingData ? '' : minPrice?.toString()}
            id="priceMin"
            name="от"
            disabled={isFetchingData}
            value={minPrice}
            min="0"
            max={maxPrice}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={isFetchingData ? '' : maxPrice?.toString()}
            id="priceMax"
            name="до"
            disabled={isFetchingData}
            value={maxPrice}
            min={0}
            max={maxPrice}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
