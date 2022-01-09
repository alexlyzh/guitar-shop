type Props = {
  stringCount: number,
  onStringsFilterChange: (stringCount: number | string) =>  void,
  types: string[],
  selectedStrings: number[],
  availableStringsForSelectedTypes: number[],
}

function StringOption(props: Props): JSX.Element {
  const {stringCount, onStringsFilterChange, types, selectedStrings, availableStringsForSelectedTypes} = props;
  return (
    <div className="form-checkbox catalog-filter__block-item">
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
  );
}

export default StringOption;
