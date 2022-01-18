import {onSelectItemFocus, onSelectItemBlur} from './utils';
import {Guitar} from '../../../types/types';
import {ChangeEvent} from 'react';

type Props = {
  search: string,
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  isDropdownVisible: boolean,
  foundGuitars: Guitar[],
}

function SearchForm({search, onInputChange, isDropdownVisible, foundGuitars}: Props): JSX.Element {
  return (
    <div className="form-search" data-testid="form-search">
      <form className="form-search__form" onSubmit={(evt) => evt.preventDefault()}>
        <button className="form-search__submit" type="button">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"/>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search" type="text" autoComplete="off"
          placeholder="что вы ищите?"
          value={search}
          onChange={onInputChange}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul
        className={`form-search__select-list ${isDropdownVisible ? '': 'hidden'}`}
        style={{zIndex: '1'}}
      >
        {foundGuitars.map((guitar, i) => {
          const key = `search-${i}`;
          return (
            <li
              className="form-search__select-item"
              tabIndex={0}
              style={{outline: 'none'}}
              key={key}
              data-id={guitar.id}
              onFocus={onSelectItemFocus}
              onBlur={onSelectItemBlur}
            >
              {guitar.name}
            </li>
          );
        })}

      </ul>
    </div>
  );
}

export default SearchForm;
