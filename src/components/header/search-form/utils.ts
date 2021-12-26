import {isEnterKeyDown} from '../../../utils';
import {FocusEvent} from 'react';

const onSelectItemEnterKeyDown = (evt: KeyboardEvent) => {
  if (isEnterKeyDown(evt)) {
    // TODO: Редирект на страницу с подробностями о гитаре
  }
};

const onSelectItemFocus = ({target}: FocusEvent<HTMLLIElement>) => {
  target.addEventListener('keydown', onSelectItemEnterKeyDown);
};

const onSelectItemBlur = ({target}: FocusEvent<HTMLLIElement>) => {
  target.removeEventListener('keydown', onSelectItemEnterKeyDown);
};

export {onSelectItemBlur, onSelectItemFocus};
