import FilterPrice from './filter-price/filter-price';
import FilterType from './filter-type/filter-type';
import FilterString from './filter-string/filter-string';
import {useSelector} from 'react-redux';
import {getCurrentFilter} from '../../../store/reducer/data-reducer/selectors';

type Props = {
  isFetchingData: boolean,
}

function FilterForm({isFetchingData}: Props): JSX.Element {
  const currentFilter = useSelector(getCurrentFilter);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice
        isFetchingData={isFetchingData}
        currentFilter={currentFilter}
      />

      <FilterType
        isFetchingData={isFetchingData}
        currentFilter={currentFilter}
      />

      <FilterString
        isFetchingData={isFetchingData}
        currentFilter={currentFilter}
      />
    </form>
  );
}

export default FilterForm;
