import {stringOptions} from '../../../../const';

type Props = {
  types: string[],
  selectedStrings: number[],
  availableStringsForSelectedTypes: number[],
  onStringsFilterChange: (stringCount: number | string) =>  void,
}

function FilterString({types, selectedStrings, availableStringsForSelectedTypes, onStringsFilterChange}: Props): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {stringOptions.map((stringCount) => (
        <div className="form-checkbox catalog-filter__block-item" key={stringCount}>
          <input
            className="visually-hidden"
            type="checkbox"
            id={`${stringCount}-strings`}
            name={`${stringCount}-strings`}
            value={stringCount}
            onChange={() => onStringsFilterChange(stringCount)}
            disabled={Boolean(types.length && !availableStringsForSelectedTypes.includes(stringCount))}
            checked={selectedStrings.includes(stringCount)}
          />
          <label htmlFor={`${stringCount}-strings`}>{stringCount}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterString;
