import {useDispatch} from 'react-redux';
import {ChangeEvent} from 'react';
import {ActionCreator} from '../../../store/actions';
import {INITIAL_SEARCH} from '../../../const';

type Props = {
  currentSearch: string,
}

function SearchForm({currentSearch}: Props): JSX.Element {
  const dispatch = useDispatch();

  const onInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    dispatch(ActionCreator.changeSearch(target.value));
  };

  const onInputBlur = () => {
    dispatch(ActionCreator.changeSearch(INITIAL_SEARCH));
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"/>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search" type="text" autoComplete="off"
          placeholder="что вы ищите?"
          value={currentSearch}
          onChange={onInputChange}
          onBlur={onInputBlur}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul
        className={`form-search__select-list ${!currentSearch ? 'hidden': ''}`}
        style={{zIndex: '1'}}
      >
        <li className="form-search__select-item" tabIndex={0}>Четстер Plus</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX2</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX3</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX4</li>
        <li className="form-search__select-item" tabIndex={0}>Четстер UX5</li>
      </ul>
    </div>
  );
}

export default SearchForm;
