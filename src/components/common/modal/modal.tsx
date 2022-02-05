import {ReactNode, useRef} from 'react';
import { useTabKeyFocusTrap } from '../../../hooks/use-tab-key-focus-trap/use-tab-key-focus-trap';
import ReactDOM from 'react-dom';

type Props = {
  children: ReactNode,
  isOpen: boolean,
  onModalClose: () => void,
  className?: string,
}

function Modal({children, className, isOpen, onModalClose}: Props) {
  const focusTrapRef = useRef<HTMLDivElement | null>(null);
  useTabKeyFocusTrap(focusTrapRef);

  return ReactDOM.createPortal(
    <div className={`modal ${isOpen ? 'is-active' : ''} ${className}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onModalClose}/>
        <div className="modal__content" ref={focusTrapRef}>
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
