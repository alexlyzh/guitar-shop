import {render, screen} from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { siteRoutes } from '../../../const/app-routes';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', async () => {
    render (
      <Router history={history}>
        <Breadcrumbs routes={siteRoutes}/>
      </Router>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    siteRoutes.forEach((route) => expect(screen.getByText(route.title)).toBeInTheDocument());
  });
});
