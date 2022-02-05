import {useEffect, useState} from 'react';
import { Guitar } from '../../../types/types';
import { MODAL_FADE_OUT_DURATION } from '../../../const';
import Modal from '../../common/modal/modal';
import ReviewForm from '../review-form/review-form';
import ReviewSuccess from '../review-success/review-success';

enum ClassName {
  review = 'modal--review',
  success = 'modal--success'
}

type Props = {
  product: Guitar,
  isOpen: boolean,
  onModalClose: () => void,
}

function ReviewModal({product, isOpen, onModalClose}: Props): JSX.Element {
  const [shouldShowSuccess, setShouldShowSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShouldShowSuccess(false), MODAL_FADE_OUT_DURATION);
    }
  }, [isOpen, setShouldShowSuccess]);

  return (
    <Modal isOpen={isOpen} onModalClose={onModalClose} className={shouldShowSuccess ? ClassName.success : ClassName.review}>
      {!shouldShowSuccess
        ? <ReviewForm product={product} onSubmitSuccess={() => setShouldShowSuccess(true)} />
        : <ReviewSuccess onModalClose={onModalClose} />}
    </Modal>
  );
}

export default ReviewModal;
