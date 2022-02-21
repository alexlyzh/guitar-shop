type Props = {
  id: string,
  name: string,
  onInputChange: () => void,
  labelText: number | string,
  isDisabled?: boolean,
  isChecked?: boolean,
}

function FilterCheckbox(props: Props): JSX.Element {
  const {id, name, onInputChange, labelText, isChecked, isDisabled} = props;

  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={id}
        name={name}
        onChange={onInputChange}
        disabled={isDisabled}
        checked={isChecked}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}

export default FilterCheckbox;
