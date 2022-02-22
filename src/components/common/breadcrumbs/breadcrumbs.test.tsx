import Breadcrumbs from './breadcrumbs';
import { Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppPath, breadcrumb } from '../../../const/app-routes';
import { getRandomInteger } from '../../../utils/common';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', async () => {
    const breadcrumbs = Object.values(breadcrumb).filter(() => Boolean(getRandomInteger()));

    if (!breadcrumbs.length) {
      breadcrumbs.push(breadcrumb[AppPath.root]);
    }

    render(
      <Router history={history}>
        <Breadcrumbs routes={breadcrumbs}/>
      </Router>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(breadcrumbs.length);
  });
});
