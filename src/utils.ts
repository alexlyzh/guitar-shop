import {KeyCode} from './const';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ESC;
export const isEnterKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ENTER;

