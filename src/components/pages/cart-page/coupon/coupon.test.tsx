import Coupon from './coupon';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../../../../types/types';

const mockStore = configureMockStore();

describe('Component: Coupon', () => {
  it('should render correctly', () => {
    const store = mockStore();
    const discount = {
      size: 0.25,
      coupon: 'some-coupon',
      requestStatus: RequestStatus.SUCCESS,
    };

    render(
      <Provider store={store}>
        <Coupon discount={discount} />
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Введите промокод/i)).toHaveDisplayValue('some-coupon');
    expect(screen.getByText(/промокод принят/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /применить/i })).toBeInTheDocument();
  });
});
