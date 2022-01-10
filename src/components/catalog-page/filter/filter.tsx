import FilterPrice from './filter-price/filter-price';
import FilterType from './filter-type/filter-type';
import FilterString from './filter-string/filter-string';
import {useDispatch, useSelector} from 'react-redux';
import {ActionCreator} from '../../../store/actions';
import {ActionAPI} from '../../../store/api-actions/api-actions';
import {GuitarTypeNameSpace} from '../../../const';
import {getAvailableStringsByFilterTypes, getCurrentFilter} from '../../../store/reducer/filter-reducer/selectors';
import {getCatalogPriceRange} from '../../../store/reducer/data-reducer/selectors';
import {usePriceFilter} from '../../../hooks/use-price-filter/use-price-filter';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const {types, strings} = useSelector(getCurrentFilter);
  const availableStringsForSelectedTypes = useSelector(getAvailableStringsByFilterTypes);
  const {min : minPriceLimit, max : maxPriceLimit} = useSelector(getCatalogPriceRange);

  const {
    onPriceMinChange,
    onPriceMaxChange,
    onPriceMinBlur,
    onPriceMaxBlur,
  } = usePriceFilter(minPriceLimit, maxPriceLimit);

  const onStringsFilterChange = (stringCount: number | string) => {
    dispatch(ActionCreator.toggleStringCondition(Number(stringCount)));
    dispatch(ActionAPI.updateFilter());
  };

  const onGuitarTypeChange = (type: GuitarTypeNameSpace) => {
    dispatch(ActionCreator.toggleTypeCondition(type));
    dispatch(ActionAPI.updateFilter());
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice
        minPriceLimit={minPriceLimit}
        maxPriceLimit={maxPriceLimit}
        onPriceMinChange={onPriceMinChange}
        onPriceMaxChange={onPriceMaxChange}
        onPriceMinBlur={onPriceMinBlur}
        onPriceMaxBlur={onPriceMaxBlur}
      />
      <FilterType onGuitarTypeChange={onGuitarTypeChange}/>
      <FilterString
        types={types}
        selectedStrings={strings}
        availableStringsForSelectedTypes={availableStringsForSelectedTypes}
        onStringsFilterChange={onStringsFilterChange}
      />
    </form>
  );
}

export default Filter;
