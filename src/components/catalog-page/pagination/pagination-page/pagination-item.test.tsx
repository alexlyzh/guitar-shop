import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import PaginationItem from './pagination-item';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <PaginationItem
          linkText={'mock'}
          onLinkClick={jest.fn}
          isActive={false}
          className={'mock'}
        />
      </Router>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('mock')).toBeInTheDocument();
  });

  it('should call onLinkClick', () => {
    const onLinkClick = jest.fn();
    render(
      <Router history={history}>
        <PaginationItem
          linkText={'mock'}
          onLinkClick={onLinkClick}
          isActive={false}
          className={'mock'}
        />
      </Router>);

    userEvent.click(screen.getByRole('link'));
    expect(onLinkClick).toBeCalled();
  });
});
