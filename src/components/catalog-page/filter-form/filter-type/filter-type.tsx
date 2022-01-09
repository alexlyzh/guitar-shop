type Props = {
  onGuitarTypeChange: (type: string) => void,
}

function FilterType({onGuitarTypeChange}: Props): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"
          onChange={({target}) => onGuitarTypeChange(target.name)}
        />
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="electric" name="electric"
          onChange={({target}) => onGuitarTypeChange(target.name)}
        />
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"
          onChange={({target}) => onGuitarTypeChange(target.name)}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
