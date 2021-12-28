import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent, useRef} from 'react';
import {ActionCreator} from '../../../../store/actions';
import {FilterSettings} from '../../../../store/reducer/data-reducer/data-reducer';
import {getPricesRange} from '../../../../store/reducer/data-reducer/selectors';

type Props = {
  isFetchingData: boolean,
  currentFilter: FilterSettings
}

function FilterPrice({isFetchingData, currentFilter}: Props): JSX.Element {
  const dispatch = useDispatch();
  const priceFromRef = useRef<HTMLInputElement | null>(null);
  const priceToRef = useRef<HTMLInputElement | null>(null);

  const {priceMin, priceMax} = useSelector(getPricesRange);
  const {priceFrom, priceTo} = currentFilter;

  console.log({priceMin, priceMax})//eslint-disable-line
  console.log({priceFrom, priceTo})//eslint-disable-line

  const onPriceFromBlur = ({target}: ChangeEvent<HTMLInputElement>) => {
    const updPriceFrom = Math.min(priceMax, Math.max(priceMin, Number(target.value)));
    const updPriceTo = priceTo && (updPriceFrom > priceTo) ? updPriceFrom : priceTo;
    target.value = updPriceFrom.toString();
    dispatch(ActionCreator.changeFilter(
      {...currentFilter,
        ...{priceFrom: updPriceFrom, priceTo: updPriceTo},
      }));
  };

  const onPriceToBlur = ({target}: ChangeEvent<HTMLInputElement>) => {
    const updPriceTo = Math.max(priceMin, Math.min(priceMax, Number(target.value)));
    const updPriceFrom = priceFrom && (updPriceTo < priceFrom) ? updPriceTo : priceFrom;
    target.value = updPriceTo.toString();
    dispatch(ActionCreator.changeFilter(
      {...currentFilter,
        ...{priceFrom: updPriceFrom, priceTo: updPriceTo},
      }));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={isFetchingData ? '' : priceMin?.toString()}
            id="priceMin"
            name="от"
            ref={priceFromRef}
            disabled={isFetchingData}
            onBlur={onPriceFromBlur}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={isFetchingData ? '' : priceMax?.toString()}
            id="priceMax"
            name="до"
            ref={priceToRef}
            disabled={isFetchingData}
            onBlur={onPriceToBlur}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
