import {useEffect, useState} from 'react';
import { useModal } from '../../../hooks/use-modal/use-modal';
import { Link } from 'react-router-dom';
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
}

function ReviewModal({product}: Props): JSX.Element {
  const [isModalOpen, showModal, hideModal] = useModal();
  const [shouldShowSuccess, setShouldShowSuccess] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => setShouldShowSuccess(false), MODAL_FADE_OUT_DURATION);
    }
  }, [isModalOpen, setShouldShowSuccess]);

  return (
    <>
      <Link className="button button--red-border button--big reviews__submit-button"
        to="#"
        onClick={showModal}
      >
        Оставить отзыв
      </Link>
      <Modal isOpen={isModalOpen} onModalClose={hideModal} className={shouldShowSuccess ? ClassName.success : ClassName.review}>
        {!shouldShowSuccess
          ? <ReviewForm isModalOpen={isModalOpen} product={product} onSubmitSuccess={() => setShouldShowSuccess(true)} />
          : <ReviewSuccess onButtonClick={hideModal} />}
      </Modal>
    </>
  );
}

export default ReviewModal;
