import ReviewSuccessModal from './review-success-modal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', () => {
    const handleClick = jest.fn();
    render(<ReviewSuccessModal onButtonClick={handleClick} />);

    expect(screen.getByText(/Спасибо/)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам/)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(handleClick).toBeCalled();
  });
});
