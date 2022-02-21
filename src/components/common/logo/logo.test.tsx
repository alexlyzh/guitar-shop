import {render, screen} from '@testing-library/react';
import Logo from './logo';
import {createMemoryHistory} from 'history';
import {Router, Switch, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AppPath } from '../../../const/app-routes';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should redirect to "CatalogPage" when clicked', () => {
    history.push('/fake-route');

    render(
      <Router history={history}>
        <Switch>
          <Route exact path={AppPath.root}>
            <h1>This is CatalogPage</h1>
          </Route>
          <Route>
            <Logo />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText('This is CatalogPage')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('This is CatalogPage')).toBeInTheDocument();
  });
});
