import { useModal } from '../use-modal';
import { useCallback, useEffect, useState } from 'react';
import { MODAL_FADE_OUT_DURATION } from '../../../const/common';

export const useModalWithSuccess = () => {
  const [isModalOpen, showModal, hideModal] = useModal();

  const [shouldShowSuccess, setShouldShowSuccess] = useState(false);
  const showSuccessForm = useCallback(() => setShouldShowSuccess(true), [setShouldShowSuccess]);
  const hideSuccessForm = useCallback(() => setShouldShowSuccess(false), [setShouldShowSuccess]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!isModalOpen) {
      timeout = setTimeout(hideSuccessForm, MODAL_FADE_OUT_DURATION);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
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
