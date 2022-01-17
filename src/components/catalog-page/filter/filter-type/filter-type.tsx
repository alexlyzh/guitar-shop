import {GuitarType, typeOptions} from '../../../../const';
import {useTypeFilter} from '../../../../hooks/use-type-filter/use-type-filter';
import FilterCheckbox from '../filter-checkbox/filter-checkbox';

function FilterType(): JSX.Element {
  const {handleGuitarTypeChange} = useTypeFilter();

  return (
    <fieldset className="catalog-filter__block" aria-label="filter-type">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {typeOptions.map((type) => (
        <FilterCheckbox
          key={type}
          id={type}
          name={type}
          labelText={GuitarType[type]}
          onInputChange={() => handleGuitarTypeChange(type)}
        />
      ))}
    </fieldset>
  );
}

export default FilterType;
