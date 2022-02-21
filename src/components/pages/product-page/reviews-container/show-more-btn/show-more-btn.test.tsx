import ShowMoreBtn from './show-more-btn';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: ShowMoreBtn', () => {
  it('should render correctly', () => {
    const handleClick = jest.fn();
    render(<ShowMoreBtn label={'fake-label'} onBtnClick={handleClick} />);

    expect(screen.getByText('fake-label')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'fake-label' }));
    expect(handleClick).toBeCalled();
  });
});
