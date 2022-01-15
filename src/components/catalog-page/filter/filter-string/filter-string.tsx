import {stringOptions} from '../../../../const';

type Props = {
  types: string[],
  selectedStrings: number[],
  availableStringsForSelectedTypes: number[],
  onStringsFilterChange: (stringCount: number | string) =>  void,
}

function FilterString({types, selectedStrings, availableStringsForSelectedTypes, onStringsFilterChange}: Props): JSX.Element {
  return (
    <fieldset className="catalog-filter__block" aria-label="filter-string">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {stringOptions.map((stringCount) => {
        const isChecked = selectedStrings.includes(stringCount);
        const isDisabled = Boolean(types.length && !availableStringsForSelectedTypes.includes(stringCount));
        const testId = `${isChecked ? 'checked-true' : 'checked-false'}--${isDisabled ? 'disabled-true' : 'disabled-false'}`;
        return (
          <div className="form-checkbox catalog-filter__block-item" key={stringCount}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={`${stringCount}-strings`}
              name={`${stringCount}-strings`}
              value={stringCount}
              onChange={() => onStringsFilterChange(stringCount)}
              disabled={isDisabled}
              checked={isChecked}
              data-testid={testId}
            />
            <label htmlFor={`${stringCount}-strings`} aria-label={`${stringCount}-strings`}>{stringCount}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default FilterString;
