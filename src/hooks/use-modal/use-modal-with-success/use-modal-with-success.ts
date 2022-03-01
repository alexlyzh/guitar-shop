import { useModal } from '../use-modal';
import { useCallback, useEffect, useState } from 'react';

export const useModalWithSuccess = () => {
  const [isModalOpen, showModal, hideModal] = useModal();

  const [shouldShowSuccess, setShouldShowSuccess] = useState(false);
  const showSuccessForm = useCallback(() => setShouldShowSuccess(true), [setShouldShowSuccess]);
  const hideSuccessForm = useCallback(() => setShouldShowSuccess(false), [setShouldShowSuccess]);

  useEffect(() => {
    if (!isModalOpen) {
      hideSuccessForm();
    }
  }, [isModalOpen, hideSuccessForm]);

  return {
    isModalOpen,
    showModal,
    hideModal,
    shouldShowSuccess,
    showSuccessForm,
    hideSuccessForm,
  };
};
