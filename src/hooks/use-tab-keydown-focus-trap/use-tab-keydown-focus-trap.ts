import { MutableRefObject, useEffect } from 'react';
import { KeyboardKey } from '../../const';

const FOCUSABLE_ELEMENTS_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const useTabKeydownFocusTrap = (trapRef: MutableRefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const trapElement = trapRef.current;
    if (trapElement) {
      const focusableElements = trapElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR) as NodeListOf<HTMLElement>;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const onTabKeydown = (evt: KeyboardEvent) => {
        const isTabPressed = evt.key === KeyboardKey.TAB;
        if (!isTabPressed) {
          return;
        }

        if (evt.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            evt.preventDefault();
          }
        }
        if (evt.key === KeyboardKey.TAB){
          if (document.activeElement === lastElement) {
            firstElement.focus();
            evt.preventDefault();
          }
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
