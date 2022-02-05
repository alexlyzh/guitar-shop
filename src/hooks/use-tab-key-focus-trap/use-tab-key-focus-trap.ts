import { MutableRefObject, useEffect } from 'react';
import { KeyboardKey } from '../../const';

const FOCUSABLE_ELEMENTS_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const useTabKeyFocusTrap = (trapRef: MutableRefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const trapElement = trapRef.current;
    if (trapElement) {
      const focusableElements = Array.from(trapElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)) as HTMLElement[];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const onTabKeydown = (evt: KeyboardEvent) => {
        const isTabKeydown = evt.key === KeyboardKey.TAB;
        if (!isTabKeydown) {
          return;
        }
        const currentElement = document.activeElement as HTMLElement;

        switch (true) {
          case evt.shiftKey && currentElement === firstElement:
            lastElement.focus();
            evt.preventDefault();
            break;
          case currentElement === lastElement:
            firstElement.focus();
            evt.preventDefault();
            break;
          case !focusableElements.includes(currentElement):
            firstElement.focus();
            evt.preventDefault();
            break;
        }
      };

      document.addEventListener('keydown', onTabKeydown);

      firstElement.focus();

      return () => {
        document.removeEventListener('keydown', onTabKeydown);
      };
    }
  });
};
