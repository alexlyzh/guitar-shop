import {GuitarTypeNameSpace} from '../../../../const';

type Props = {
  onGuitarTypeChange: (type: GuitarTypeNameSpace) => void,
}

function FilterType({onGuitarTypeChange}: Props): JSX.Element {
  return (
    <fieldset className="catalog-filter__block" aria-label="filter-type">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"
          onChange={() => onGuitarTypeChange(GuitarTypeNameSpace.acoustic)}
        />
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="electric" name="electric"
          onChange={() => onGuitarTypeChange(GuitarTypeNameSpace.electric)}
        />
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"
          onChange={() => onGuitarTypeChange(GuitarTypeNameSpace.ukulele)}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
