import {stringOptions} from '../../../../const';
import FilterCheckbox from '../filter-checkbox/filter-checkbox';
import {useStringFilter} from '../../../../hooks/use-string-filter/use-string-filter';

type Props = {
  types: string[],
  selectedStrings: number[],
  availableStringsForSelectedTypes: number[],
}

function FilterString({types, selectedStrings, availableStringsForSelectedTypes}: Props): JSX.Element {
  const {handleStringFilterChange} = useStringFilter();

  return (
    <fieldset className="catalog-filter__block" aria-label="filter-string">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {stringOptions.map((stringCount) => {
        const isChecked = selectedStrings.includes(stringCount);
        const isDisabled = Boolean(types.length && !availableStringsForSelectedTypes.includes(stringCount));

        return (
          <FilterCheckbox
            key={`${stringCount}-strings`}
            id={`${stringCount}-strings`}
            name={`${stringCount}-strings`}
            labelText={stringCount}
            onInputChange={() => handleStringFilterChange(stringCount)}
            isChecked={isChecked}
            isDisabled={isDisabled}
          />
        );
      })}
    </fieldset>
  );
}

export default FilterString;
