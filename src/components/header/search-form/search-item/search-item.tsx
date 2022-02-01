import {MouseEvent, KeyboardEvent} from 'react';
import {Guitar} from '../../../../types/types';

type Props = {
  guitar: Guitar,
  onItemKeyDown: (evt: KeyboardEvent<HTMLLIElement>) => void,
  onItemClick: (evt: MouseEvent) => void,
}

function SearchItem({guitar, onItemKeyDown, onItemClick}: Props): JSX.Element {
  return (
    <li
      className="form-search__select-item"
      tabIndex={0}
      style={{outline: 'none'}}
      onKeyDown={onItemKeyDown}
      onClick={onItemClick}
    >
      {guitar.name}
    </li>
  );
}

export default SearchItem;
