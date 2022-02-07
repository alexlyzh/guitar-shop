import Review from './review';
import { render, screen } from '@testing-library/react';
import { getMockComment, Mock } from '../../../../utils/mock';
import { formatDate } from './utils';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const comment = getMockComment(Mock.id);

    render(<Review review={comment} />);

    expect(screen.getByText(comment.advantage)).toBeInTheDocument();
    expect(screen.getByText(comment.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(formatDate(comment.createAt))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${comment.userName}`))).toBeInTheDocument();
  });
});
