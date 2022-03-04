import Modal from '../../../common/modal/modal';
import ReviewMainModal from './review-main-modal/review-main-modal';
import ReviewSuccessModal from './review-success-modal/review-success-modal';
import ModalOpenButton from '../../../common/modal-open-button/modal-open-button';
import { Guitar, ModalType } from '../../../../types/types';
import { useModalWithSuccess } from '../../../../hooks/use-modal/use-modal-with-success/use-modal-with-success';

enum ClassName {
  main = 'modal--review',
  success = 'modal--success'
}

type Props = {
  product: Guitar,
}

function ReviewModal({product}: Props): JSX.Element {
  const {isModalOpen, hideModal, showModal, shouldShowSuccess, showSuccessForm} = useModalWithSuccess();

  return (
    <>
      <ModalOpenButton type={ModalType.review} onLinkClick={showModal} />
      {isModalOpen ?
        <Modal isOpen={isModalOpen} onModalClose={hideModal} className={shouldShowSuccess ? ClassName.success : ClassName.main}>
          {!shouldShowSuccess
            ? <ReviewMainModal isModalOpen={isModalOpen} product={product} onSubmitSuccess={showSuccessForm} />
            : <ReviewSuccessModal onButtonClick={hideModal} />}
        </Modal> : null}
    </>
  );
}

export default ReviewModal;
