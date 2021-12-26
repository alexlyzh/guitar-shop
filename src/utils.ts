import {KeyCode} from './const';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ESC_KEY;
export const isEnterKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ENTER_KEY;
