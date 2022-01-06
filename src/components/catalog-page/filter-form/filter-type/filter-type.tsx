import {useDispatch} from 'react-redux';
import {ChangeEvent} from 'react';
import {ActionCreator} from '../../../../store/actions';
import {ActionAPI} from '../../../../store/api-actions/api-actions';

function FilterType(): JSX.Element {
  const dispatch = useDispatch();

  const onGuitarTypeChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    dispatch(ActionCreator.toggleTypeCondition(target.name));
    dispatch(ActionAPI.updateFilter());
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"
          onChange={onGuitarTypeChange}
        />
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="electric" name="electric"
          onChange={onGuitarTypeChange}
        />
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"
          onChange={onGuitarTypeChange}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
