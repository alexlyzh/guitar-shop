import ReviewsContainer from './reviews-container';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../../../types/types';
import { getMockComment, getMockGuitar, Mock } from '../../../utils/mock';
import { initialAppState } from '../../../store/reducer/app-reducer/app-reducer';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Reviews', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
  const store = mockStore({ APP: initialAppState });

  it('should render correctly', () => {
    const guitar = getMockGuitar();
    const comments = Array.from({length: Mock.arrayLength}, () => getMockComment(guitar.id));
    render(
      <Provider store={store} >
        <Router history={history} >
          <ReviewsContainer
            comments={{
              requestStatus: RequestStatus.SUCCESS,
              data: comments,
            }}
            product={guitar}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Отзывы/)).toBeInTheDocument();
  });
});
