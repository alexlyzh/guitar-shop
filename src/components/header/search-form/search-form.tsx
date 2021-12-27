import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {onSelectItemFocus, onSelectItemBlur} from './utils';
import {isEscKeyDown} from '../../../utils';
import {useDispatch} from 'react-redux';
import {APIAction} from '../../../store/api-actions';
import {Guitar} from '../../../types/types';

function SearchForm(): JSX.Element {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [foundGuitars, setFoundGuitars] = useState<Guitar[]>([]);
  const isDropdownVisible = foundGuitars.length;

  const onInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
    dispatch(APIAction.searchGuitars(target.value, setFoundGuitars));
  };

  const onDocumentEscKeydown = useCallback((evt: KeyboardEvent) => {
    if (isEscKeyDown(evt)) {
      setSearch('');
      setFoundGuitars([]);
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  }, []);

  useEffect(() => {
    isDropdownVisible && document.addEventListener('keydown', onDocumentEscKeydown);
    return () => document.removeEventListener('keydown', onDocumentEscKeydown);
  }, [isDropdownVisible, onDocumentEscKeydown]);

  return (
    <div className="form-search">
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
        {foundGuitars.map((guitar) => (
          <li
            className="form-search__select-item"
            tabIndex={0}
            style={{outline: 'none'}}
            key={guitar.id}
            data-id={guitar.id}
            onFocus={onSelectItemFocus}
            onBlur={onSelectItemBlur}
          >
            {guitar.name}
          </li>
        ))}

      </ul>
    </div>
  );
}

export default SearchForm;
