import ReviewModal from './review-modal';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { getMockGuitarWithComments } from '../../../../utils/mock';
import { initialAppState } from '../../../../store/reducer/app-reducer/app-reducer';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    const store = mockStore({ APP: initialAppState });
    const guitar = getMockGuitarWithComments();
    render(
      <Provider store={store}>
        <Router history={history} >
          <ReviewModal product={guitar} />
        </Router>
      </Provider>,
    );

    const modalOpenBtn = screen.getByLabelText(/open review modal/i);
    expect(modalOpenBtn).toBeInTheDocument();

    userEvent.click(modalOpenBtn);
    expect(screen.getByText(new RegExp(`${guitar.name}`, 'i'))).toBeInTheDocument();
  });
});
