import { useModal } from '../use-modal';
import { useCallback, useEffect, useState } from 'react';
import { MODAL_FADE_OUT_DURATION } from '../../../const/common';

export const useModalWithSuccess = () => {
  const [isModalOpen, showModal, hideModal] = useModal();

  const [shouldShowSuccess, setShouldShowSuccess] = useState(false);
  const showSuccessForm = useCallback(() => setShouldShowSuccess(true), [setShouldShowSuccess]);
  const hideSuccessForm = useCallback(() => setShouldShowSuccess(false), [setShouldShowSuccess]);

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(hideSuccessForm, MODAL_FADE_OUT_DURATION);
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
