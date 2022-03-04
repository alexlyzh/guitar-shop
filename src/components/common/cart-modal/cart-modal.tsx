import ModalOpenButton from '../modal-open-button/modal-open-button';
import Modal from '../modal/modal';
import CartMainModal from './cart-main-modal/cart-main-modal';
import CartSuccessModal from './cart-success-modal/cart-success-modal';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModalWithSuccess } from '../../../hooks/use-modal/use-modal-with-success/use-modal-with-success';
import { getCartItemIds } from '../../../store/reducer/cart-reducer/selectors';
import { Guitar, GuitarWithComments, ModalType } from '../../../types/types';
import { AppPath } from '../../../const/app-routes';
import { cartAction } from '../../../store/reducer/cart-reducer/cart-reducer';
import { MODAL_OPEN_CLASSNAME } from '../../../const/common';

enum ClassName {
  main = 'modal-cart--add',
  success = 'modal--success'
}

type Props = {
  guitar: GuitarWithComments,
  type: ModalType,
}

const adaptToCart = ({id, name, vendorCode, type, description, previewImg, stringCount, rating, price}: GuitarWithComments): Guitar =>
  ({ id, name, vendorCode, type, description, previewImg, stringCount, rating, price });

function CartModal({guitar, type}: Props): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItemIds = useSelector(getCartItemIds);
  const { isModalOpen, hideModal, showModal, shouldShowSuccess, showSuccessForm } = useModalWithSuccess();
  const adaptedGuitar = useMemo(() => adaptToCart(guitar), [guitar]);
  const isInCart = useMemo(() => cartItemIds.includes(adaptedGuitar.id), [cartItemIds, adaptedGuitar]);

  const redirectToCart = () => {
    document.body.classList.remove(MODAL_OPEN_CLASSNAME);
    history.push(AppPath.cart);
  };

  const addToCart = () => {
    dispatch(cartAction.add(adaptedGuitar));
    showSuccessForm();
  };

  const onModalOpenBtnClick = () => {
    if (type === ModalType.catalogCart) {
      if (isInCart) {
        redirectToCart();
        return;
      }
      showModal();
      return;
    }
    showModal();
  };

  return (
    <>
      <ModalOpenButton type={type} isInCart={isInCart} onLinkClick={onModalOpenBtnClick} />
      {isModalOpen ?
        <Modal isOpen={isModalOpen} onModalClose={hideModal} className={shouldShowSuccess ? ClassName.success : ClassName.main}>
          {!shouldShowSuccess
            ? <CartMainModal product={adaptedGuitar} onAddToCartBtnClick={addToCart} />
            : <CartSuccessModal onCloseBtnClick={hideModal} onRedirectBtnClick={redirectToCart} />}
        </Modal> : null}
    </>
  );
}

export default CartModal;
