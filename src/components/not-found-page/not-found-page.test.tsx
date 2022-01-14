import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    history.push('/bad-path');
    render(
      <Router history={history}>
        <NotFoundPage/>
      </Router>,
    );

    const headerElement = screen.getByText(/Страница не найдена/i);
    const linkElement = screen.getByRole('link');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
