import { KeyboardKey, screenTopOptions, STARS_COUNT, StarSpriteID } from '../const/common';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.key === KeyboardKey.ESC;

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

export const scrollToPageTop = () => window.scrollTo(screenTopOptions);

export const getStarRatingSpriteIDs = (rating: number) =>
  new Array(STARS_COUNT).fill(null).map((star, i) => {
    if (i < rating) {
      return StarSpriteID.FULL;
    }
    return StarSpriteID.EMPTY;
  });
