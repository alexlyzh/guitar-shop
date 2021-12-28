import {KeyCode, SortOrder, SortType} from './const';
import {Guitar} from './types/types';
import {SortSettings} from './store/reducer/app-reducer/app-reducer';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ESC;
export const isEnterKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ENTER;

export const sort = ({type, order}: SortSettings, guitars: Guitar[]) => {
  switch (true) {
    case (type === SortType.PRICE && order === SortOrder.ASC):
      return guitars.slice().sort((a, b) => a.price - b.price);
    case (type === SortType.PRICE && order === SortOrder.DESC):
      return guitars.slice().sort((a, b) => b.price - a.price);
    case (type === SortType.RATING && order === SortOrder.ASC):
      return guitars.slice().sort((a, b) => a.rating - b.rating);
    case (type === SortType.RATING && order === SortOrder.DESC):
      return guitars.slice().sort((a, b) => b.rating - a.rating);
    default:
      return guitars;
  }
};
