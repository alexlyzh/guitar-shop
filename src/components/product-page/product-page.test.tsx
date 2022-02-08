import ProductPage from './product-page';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { getMockGuitar } from '../../utils/mock';
import { RequestStatus } from '../../types/types';
import { initialAppState } from '../../store/reducer/app-reducer/app-reducer';
import { initialDataState } from '../../store/reducer/data-reducer/data-reducer';

const guitar = getMockGuitar();
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      APP: initialAppState,
      DATA: {
        ...initialDataState,
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: [guitar],
        },
        comments: {
          [guitar.id]: {
            requestStatus: RequestStatus.SUCCESS,
            data: [],
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductPage productId={guitar.id} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Характеристики/)).toBeInTheDocument();
    expect(screen.getByText(/Описание/)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/)).toBeInTheDocument();
  });
});
