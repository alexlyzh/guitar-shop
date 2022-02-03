import {Guitar} from '../../../types/types';
import {ChangeEvent} from 'react';
import SearchItem from './search-item/search-item';
import {generatePath, useHistory} from 'react-router-dom';
import {AppPath, KeyboardKey} from '../../../const';

type Props = {
  search: string,
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  isDropdownVisible: boolean,
  foundGuitars: Guitar[],
}

function SearchForm({search, onInputChange, isDropdownVisible, foundGuitars}: Props): JSX.Element {
  const history = useHistory();

  const redirectToProductPage = (id: number) => {
    history.push(generatePath(AppPath.product, {id}));
  };

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
        {foundGuitars.map((guitar) => (
          <SearchItem
            key={`search-${guitar.id}`}
            guitar={guitar}
            onItemKeyDown={(evt) => {
              if (evt.key === KeyboardKey.ENTER) {
                redirectToProductPage(guitar.id);
              }
            }}
            onItemClick={() => redirectToProductPage(guitar.id)}
          />))}
      </ul>
    </div>
  );
}

export default SearchForm;
