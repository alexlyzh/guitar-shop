import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent} from 'react';
import {ActionCreator} from '../../../../store/actions';
import {FilterSettings} from '../../../../store/reducer/data-reducer/data-reducer';
import {getPricesRange} from '../../../../store/reducer/data-reducer/selectors';
import {APIAction} from '../../../../store/api-actions';

type Props = {
  isFetchingData: boolean,
  currentFilter: FilterSettings
}

const limitUpdate = (value: number | string, minLimit: number, maxLimit: number) =>
  Math.max(minLimit, Math.min(maxLimit, Number(value)));

function FilterPrice({isFetchingData, currentFilter}: Props): JSX.Element {
  const dispatch = useDispatch();
  const {minPriceLimit, maxPriceLimit} = useSelector(getPricesRange);
  const {priceMin, priceMax} = currentFilter;

  const onPriceMinInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const update = Number(target.value);
    dispatch(ActionCreator.changePriceMin(update));
    dispatch(APIAction.updateFilter());
  };

  const onPriceMaxInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const update = Number(target.value);
    dispatch(ActionCreator.changePriceMax(update));
    dispatch(APIAction.updateFilter());
  };

  const onPriceMinInputBlur = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.value) {
      dispatch(ActionCreator.changePriceMin(limitUpdate(target.value, minPriceLimit, maxPriceLimit)));
      dispatch(APIAction.updateFilter());
    }
  };

  const onPriceMaxInputBlur = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.value) {
      dispatch(ActionCreator.changePriceMax(limitUpdate(target.value, minPriceLimit, maxPriceLimit)));
      dispatch(APIAction.updateFilter());
    }
  };

  // console.log('Redux state: ', {priceMin: currentFilter.priceMin, priceMax: currentFilter.priceMax})//eslint-disable-line
  // console.log('Limits', {minPriceLimit, maxPriceLimit})//eslint-disable-line
  // console.log('_______________________________________________________________')//eslint-disable-line

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
            disabled={isFetchingData}
            value={priceMin || ''}
            onChange={onPriceMinInputChange}
            onBlur={onPriceMinInputBlur}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={isFetchingData ? '' : maxPriceLimit?.toString()}
            id="priceMax"
            name="до"
            disabled={isFetchingData}
            value={priceMax || ''}
            onChange={onPriceMaxInputChange}
            onBlur={onPriceMaxInputBlur}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
