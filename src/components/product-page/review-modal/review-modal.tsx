import { useState } from 'react';
import { Guitar } from '../../../types/types';
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

  const handleSuccessModalClose = () => {
    onModalClose();
    setShouldShowSuccess(false);
  };

  return (
    <Modal isOpen={isOpen} onModalClose={onModalClose} className={shouldShowSuccess ? ClassName.success : ClassName.review}>
      {!shouldShowSuccess && isOpen
        ? <ReviewForm product={product} onSubmitSuccess={() => setShouldShowSuccess(true)} />
        : <ReviewSuccess onModalClose={handleSuccessModalClose} />}
    </Modal>
  );
}

export default ReviewModal;
