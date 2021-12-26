import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getGuitars} from '../../../store/reducer/data-reducer/selectors';
import {onSelectItemFocus, onSelectItemBlur} from './utils';
import {isEscKeyDown} from '../../../utils';

function SearchForm(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const [search, setSearch] = useState('');
  const filteredGuitars = guitars.data.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()));
  const isDropdownVisible = search && filteredGuitars.length;

  const onInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const onDocumentEscKeydown = useCallback((evt: KeyboardEvent) => {
    if (isEscKeyDown(evt)) {
      setSearch('');
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  }, []);

  useEffect(() => {
    isDropdownVisible && document.addEventListener('keydown', onDocumentEscKeydown);
    return () => document.removeEventListener('keydown', onDocumentEscKeydown);
  }, [isDropdownVisible, onDocumentEscKeydown]);

  return (
    <div className="form-search">
      <form className="form-search__form">
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
        {filteredGuitars.map((guitar) => (
          <li
            className="form-search__select-item"
            tabIndex={0}
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
