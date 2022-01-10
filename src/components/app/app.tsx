import {Switch, Route, Redirect} from 'react-router-dom';
import {AppRoute} from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import NotFoundPage from '../not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={AppRoute.Catalog} />
      </Route>
      <Route exact path={AppRoute.Catalog}>
        <CatalogPage />
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  );
}

export default App;
