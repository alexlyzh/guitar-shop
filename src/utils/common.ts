import {KeyCode} from '../const';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ESC;
export const isEnterKeyDown = (evt: KeyboardEvent) => evt.keyCode === KeyCode.ENTER;

export const debounce = <A = unknown, R = void>(
  callback: (params: A) => R,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (args: A) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.call(this, args), delay);
  };
};

export const getRandomInteger = (min = 0, max = 1): number => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
