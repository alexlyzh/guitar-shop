import ReactDOM from 'react-dom';
import { ReactNode, useRef } from 'react';
import { useTabKeyFocusTrap } from '../../../hooks/use-tab-key-focus-trap/use-tab-key-focus-trap';

const ACTIVE_CLASSNAME = 'is-active';

type ModalProps = {
  children: ReactNode,
  isOpen: boolean,
  onModalClose: () => void,
  className?: string,
}

function Modal({children, className, isOpen, onModalClose}: ModalProps) {
  const focusTrapRef = useRef<HTMLDivElement | null>(null);
  useTabKeyFocusTrap(focusTrapRef, isOpen);

  const modalRef = useRef<HTMLDivElement>(null);

  return ReactDOM.createPortal(
    <div className={`modal ${ACTIVE_CLASSNAME} ${className ? className : ''}`} ref={modalRef} aria-label="modal window">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onModalClose}/>
        <div className="modal__content" ref={focusTrapRef} >
          {children}
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onModalClose}>
            <span className="button-cross__icon"/><span className="modal__close-btn-interactive-area"/>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement);
}

export default Modal;
export type { ModalProps };
