import ModalOpenButton from './modal-open-button';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { ModalType } from '../../../types/types';

const history = createMemoryHistory();

describe('Component: ModalOpenButton', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ModalOpenButton type={ModalType.review} />
      </Router>,
    );
    expect(screen.getByLabelText(/open review modal/i)).toBeInTheDocument();
  });
});
