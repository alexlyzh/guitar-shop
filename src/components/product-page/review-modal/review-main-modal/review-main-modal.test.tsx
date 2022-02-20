import ReviewMainModal from './review-main-modal';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getMockGuitar } from '../../../../utils/mock';
import { initialAppState } from '../../../../store/reducer/app-reducer/app-reducer';

const mockStore = configureMockStore();

describe('Component: ReviewMainModal', () => {
  const store = mockStore({ APP: initialAppState });

  it('should render correctly', () => {
    const guitar = getMockGuitar();
    render(
      <Provider store={store}>
        <ReviewMainModal product={guitar} />
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/)).toBeInTheDocument();
    expect(screen.getByText(guitar.name)).toBeInTheDocument();
    expect(screen.getByText(/Оценка/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Отправить/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Достоинства/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Недостатки/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Комментарий/ })).toBeInTheDocument();
  });
});
