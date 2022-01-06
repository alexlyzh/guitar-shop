import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent} from 'react';
import {ActionCreator} from '../../../../store/actions';
import {ActionAPI} from '../../../../store/api-actions/api-actions';
import {getAvailableStringsByFilterTypes, getCurrentFilter} from '../../../../store/reducer/filter-reducer/selectors';

function FilterString(): JSX.Element {
  const dispatch = useDispatch();
  const {types} = useSelector(getCurrentFilter);
  const filteredStrings = useSelector(getAvailableStringsByFilterTypes);

  const onGuitarStringsChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    dispatch(ActionCreator.toggleStringCondition(Number(target.value)));
    dispatch(ActionAPI.updateFilter());
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" value={4}
          onChange={onGuitarStringsChange}
          disabled={Boolean(types.length && !filteredStrings.includes(4))}
        />
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" value={6}
          onChange={onGuitarStringsChange}
          disabled={Boolean(types.length && !filteredStrings.includes(6))}
        />
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" value={7}
          onChange={onGuitarStringsChange}
          disabled={(Boolean(types.length && !filteredStrings.includes(7)))}
        />
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" value={12}
          onChange={onGuitarStringsChange}
          disabled={Boolean(types.length && !filteredStrings.includes(12))}
        />
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>
  );
}

export default FilterString;
