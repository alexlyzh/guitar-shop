import {KeyCode} from './const';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ESC;
export const isEnterKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ENTER;

export const debounce = (
  callback: (...params: any[]) => any,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
};
