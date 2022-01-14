import {render, screen} from '@testing-library/react';
import StarRating from './star-rating';

describe('Component: StarRating', () => {
  it('should render correctly', () => {
    render(<StarRating rating={3} />);
    expect(screen.getAllByTestId('full')).toHaveLength(3);
  });
});
