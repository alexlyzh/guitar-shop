import FilterCheckbox from '../filter-checkbox/filter-checkbox';
import { guitarType, typeOptions } from '../../../../../const/common';
import { useTypeFilter } from '../../../../../hooks/use-type-filter/use-type-filter';

type Props = {
  types: string[],
}

function FilterType({types}: Props): JSX.Element {
  const {handleGuitarTypeChange} = useTypeFilter();

  return (
    <fieldset className="catalog-filter__block" aria-label="filter-type">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {typeOptions.map((type) => {
        const onInputChange = () => handleGuitarTypeChange(type);
        return (
          <FilterCheckbox
            key={type}
            id={type}
            name={type}
            labelText={guitarType[type].filterName}
            onInputChange={onInputChange}
            isChecked={types.includes(type)}
          />
        );
      })}
    </fieldset>
  );
}

export default FilterType;
