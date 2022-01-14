import {render, screen} from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', async () => {
    render (
      <Router history={history}>
        <Breadcrumbs />
      </Router>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
  });
});
