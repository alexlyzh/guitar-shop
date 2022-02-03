import {useCallback, useEffect, useState} from 'react';
import {isEscKeyDown} from '../../utils/common';

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
    isOpen && document.body.classList.add('modal-open');
    !isOpen && document.body.classList.remove('modal-open');
  }, [isOpen]);

  return [isOpen, showModal, hideModal] as [boolean, () => void, () => void];
};
