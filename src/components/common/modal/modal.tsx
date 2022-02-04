import { ReactNode, useRef } from 'react';
import { useTabKeyFocusTrap } from '../../../hooks/use-tab-key-focus-trap/use-tab-key-focus-trap';
import ReactDOM from 'react-dom';

type Props = {
  isOpen: boolean,
  children: ReactNode,
  onModalClose: () => void,
}

function Modal({isOpen, children, onModalClose}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);
  useTabKeyFocusTrap(divRef);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal is-active modal--review">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onModalClose}/>
        <div className="modal__content" ref={divRef}>
          {children}
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onModalClose}>
            <span className="button-cross__icon"/><span className="modal__close-btn-interactive-area"/>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement);
}

export default Modal;
