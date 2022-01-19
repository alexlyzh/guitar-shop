import {GuitarType, typeOptions} from '../../../../const';
import {useTypeFilter} from '../../../../hooks/use-type-filter/use-type-filter';
import FilterCheckbox from '../filter-checkbox/filter-checkbox';

type Props = {
  types: string[],
}

function FilterType({types}: Props): JSX.Element {
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
          isChecked={types.includes(type)}
        />
      ))}
    </fieldset>
  );
}

export default FilterType;
