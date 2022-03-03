import CartModal from './cart-modal';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { getMockGuitarWithComments } from '../../../utils/mock';
import { ModalType } from '../../../types/types';
import { initialCartState } from '../../../store/reducer/cart-reducer/cart-reducer';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('Component: CartModal', () => {
  it('should render correctly and change change modal state', () => {
    const guitar = getMockGuitarWithComments();
    const store = mockStore({CART: initialCartState});
    render(
      <Router history={history}>
        <Provider store={store}>
          <CartModal guitar={guitar} type={ModalType.catalogCart} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByRole('modal-open-button'));
    userEvent.click(screen.getByRole('button', { name: /Добавить в корзину/i }));
    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});
