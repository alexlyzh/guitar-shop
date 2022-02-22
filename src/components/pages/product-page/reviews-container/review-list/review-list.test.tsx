import ReviewList from './review-list';
import { render, screen } from '@testing-library/react';
import { getMockComment, getMockGuitarWithComments, Mock } from '../../../../../utils/mock';

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitarWithComments();
    const comments = Array.from({length: Mock.arrayLength}, () => getMockComment(guitar.id));

    render(<ReviewList reviews={comments} />);

    expect(screen.getAllByText(/Комментарий/)).toHaveLength(comments.length);
  });
});
