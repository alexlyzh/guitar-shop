import { render, screen } from '@testing-library/react';
import Modal from './modal';
import userEvent from '@testing-library/user-event';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('Component: Modal', () =>{
  it('should correctly render and call onModalClose', () => {
    const handleModalClose = jest.fn();

    render(
      <Modal isOpen onModalClose={handleModalClose}>
        Modal content
      </Modal>,
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', {name: 'Закрыть'}));
    expect(handleModalClose).toBeCalledTimes(1);
  });

  it('should be unmounted', () => {
    const { unmount } = render(
      <Modal isOpen onModalClose={jest.fn}>
        Modal content
      </Modal>,
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    unmount();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });
});
