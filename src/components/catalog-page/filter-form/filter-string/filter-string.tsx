import {useDispatch, useSelector} from 'react-redux';
import {ActionCreator} from '../../../../store/actions';
import {ActionAPI} from '../../../../store/api-actions/api-actions';
import {getAvailableStringsByFilterTypes, getCurrentFilter} from '../../../../store/reducer/filter-reducer/selectors';
import {stringOptions} from '../../../../const';
import StringOption from './string-option/string-option';

function FilterString(): JSX.Element {
  const dispatch = useDispatch();
  const {types, strings} = useSelector(getCurrentFilter);
  const availableStringsForSelectedTypes = useSelector(getAvailableStringsByFilterTypes);

  const onStringsFilterChange = (stringCount: number | string) => {
    dispatch(ActionCreator.toggleStringCondition(Number(stringCount)));
    dispatch(ActionAPI.updateFilter());
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {stringOptions.map((stringCount) => (
        <StringOption
          key={stringCount}
          stringCount={stringCount}
          onStringsFilterChange={onStringsFilterChange}
          types={types}
          selectedStrings={strings}
          availableStringsForSelectedTypes={availableStringsForSelectedTypes}
        />
      ))}
    </fieldset>
  );
}

export default FilterString;
