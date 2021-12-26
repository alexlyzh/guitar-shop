import {KeyCode, SortOrder, SortType} from './const';
import {Guitar} from './types/types';
import {CurrentSort} from './store/reducer/app-reducer/app-reducer';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ESC_KEY;
export const isEnterKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ENTER_KEY;

export const sort = ({type, order}: CurrentSort, guitars: Guitar[]) => {
  switch (true) {
    case (type === SortType.PRICE && order === SortOrder.ASCENDING):
      return guitars.slice().sort((a, b) => a.price - b.price);
    case (type === SortType.PRICE && order === SortOrder.DESCENDING):
      return guitars.slice().sort((a, b) => b.price - a.price);
    case (type === SortType.RATING && order === SortOrder.ASCENDING):
      return guitars.slice().sort((a, b) => a.rating - b.rating);
    case (type === SortType.RATING && order === SortOrder.DESCENDING):
      return guitars.slice().sort((a, b) => b.rating - a.rating);
    default:
      return guitars;
  }
};
