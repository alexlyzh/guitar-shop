import FilterPrice from './filter-price/filter-price';
import FilterType from './filter-type/filter-type';
import FilterString from './filter-string/filter-string';
import {useDispatch} from 'react-redux';
import {ActionCreator} from '../../../store/actions';
import {ActionAPI} from '../../../store/api-actions/api-actions';

function CatalogFilter(): JSX.Element {
  const dispatch = useDispatch();

  const onGuitarTypeChange = (type: string) => {
    dispatch(ActionCreator.toggleTypeCondition(type));
    dispatch(ActionAPI.updateFilter());
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice />
      <FilterType onGuitarTypeChange={onGuitarTypeChange}/>
      <FilterString />
    </form>
  );
}

export default CatalogFilter;
