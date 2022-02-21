import ModalOpenButton from '../modal-open-button/modal-open-button';
import Modal from '../modal/modal';
import CartMainModal from './cart-main-modal/cart-main-modal';
import CartSuccessModal from './cart-success-modal/cart-success-modal';
import { useHistory } from 'react-router-dom';
import { useModalWithSuccess } from '../../../hooks/use-modal/use-modal-with-success/use-modal-with-success';
import { Guitar, ModalType } from '../../../types/types';
import { AppPath } from '../../../const/app-routes';

enum ClassName {
  main = 'modal-cart--add',
  success = 'modal-success--add'
}

type Props = {
  product: Guitar,
  type: ModalType,
}

function CartModal({product, type}: Props): JSX.Element {
  const {isModalOpen, hideModal, showModal, shouldShowSuccess} = useModalWithSuccess();
  const history = useHistory();
  const redirectToCart = () => history.push(AppPath.cart);

  return (
    <>
      <ModalOpenButton type={type} onClick={showModal} />
      {isModalOpen ?
        <Modal isOpen={isModalOpen} onModalClose={hideModal} className={shouldShowSuccess ? ClassName.success : ClassName.main}>
          {!shouldShowSuccess
            ? <CartMainModal product={product} />
            : <CartSuccessModal onModalClose={hideModal} onRedirect={redirectToCart} />}
        </Modal> : null}
    </>
  );
}

export default CartModal;
