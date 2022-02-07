import TabLink from './tab-link';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: TabLink', () => {
  it('should render and call onLinkClick correctly', () => {
    const handleClick = jest.fn();
    render(
      <Router history={history}>
        <TabLink isActive label={'fake-label'} onLinkClick={handleClick} />
      </Router>,
    );

    userEvent.click(screen.getByRole('link'));
    expect(handleClick).toBeCalled();
  });
});
