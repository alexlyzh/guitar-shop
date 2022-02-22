import { useCallback, useEffect, useState } from 'react';
import { isEscKeyDown } from '../../utils/common';
import { MODAL_OPEN_CLASSNAME } from '../../const/common';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  const onDocumentEscKeydown = useCallback((evt: KeyboardEvent) => {
    if (isEscKeyDown(evt)) {
      hideModal();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  }, []);

  useEffect(() => {
    isOpen && document.addEventListener('keydown', onDocumentEscKeydown);
    return () => document.removeEventListener('keydown', onDocumentEscKeydown);
  }, [isOpen, onDocumentEscKeydown]);

  useEffect(() => {
    isOpen && document.body.classList.add(MODAL_OPEN_CLASSNAME);
    !isOpen && document.body.classList.remove(MODAL_OPEN_CLASSNAME);
  }, [isOpen]);

  return [isOpen, showModal, hideModal] as [boolean, () => void, () => void];
};
