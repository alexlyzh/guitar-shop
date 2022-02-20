import { render, screen } from '@testing-library/react';
import Modal from './modal';
import userEvent from '@testing-library/user-event';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

const renderModal = (isOpen: boolean, onModalClose: () => void) => (
  render(
    <Modal isOpen={isOpen} onModalClose={onModalClose}>
      Modal content
    </Modal>,
  )
);

describe('Component: Modal', () =>{
  it('should correctly render and call onModalClose', () => {
    const handleModalClose = jest.fn();
    renderModal(true, handleModalClose);

    expect(screen.getByText('Modal content')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', {name: 'Закрыть'}));
    expect(handleModalClose).toBeCalledTimes(1);
  });

  it('should be unmounted', () => {
    const { unmount } = renderModal(true, jest.fn);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    unmount();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });
});
