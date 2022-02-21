import FilterPrice from './filter-price/filter-price';
import FilterType from './filter-type/filter-type';
import FilterString from './filter-string/filter-string';
import {useSelector} from 'react-redux';
import {getAvailableStringsByFilterTypes, getCurrentFilter} from '../../../../store/reducer/filter-reducer/selectors';
import {getCatalogPriceRange} from '../../../../store/reducer/data-reducer/selectors';
import {usePriceFilter} from '../../../../hooks/use-price-filter/use-price-filter';

function FilterContainer(): JSX.Element {
  const {types, strings} = useSelector(getCurrentFilter);
  const availableStringsForSelectedTypes = useSelector(getAvailableStringsByFilterTypes);
  const {min : minPriceLimit, max : maxPriceLimit} = useSelector(getCatalogPriceRange);

  const {priceMin, priceMax, onPriceMinInput, onPriceMaxInput} = usePriceFilter(minPriceLimit, maxPriceLimit);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice
        priceMin={priceMin}
        priceMax={priceMax}
        minPriceLimit={minPriceLimit}
        maxPriceLimit={maxPriceLimit}
        onPriceMinInput={onPriceMinInput}
        onPriceMaxInput={onPriceMaxInput}
      />
      <FilterType
        types={types}
      />
      <FilterString
        types={types}
        selectedStrings={strings}
        availableStringsForSelectedTypes={availableStringsForSelectedTypes}
      />
    </form>
  );
}

export default FilterContainer;
