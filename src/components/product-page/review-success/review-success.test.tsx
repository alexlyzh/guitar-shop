import ReviewSuccess from './review-success';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewSuccess', () => {
  it('should render correctly', () => {
    const handleClick = jest.fn();
    render(<ReviewSuccess onButtonClick={handleClick} />);

    expect(screen.getByText(/Спасибо/)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам/)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(handleClick).toBeCalled();
  });
});
