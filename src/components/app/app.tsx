import {Switch, Route, Redirect, generatePath} from 'react-router-dom';
import {AppRoute, FIRST_PAGE} from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import NotFoundPage from '../not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={generatePath(AppRoute.CatalogPage, {id: FIRST_PAGE})} />
      </Route>
      <Route exact path={AppRoute.Catalog}>
        <Redirect to={generatePath(AppRoute.CatalogPage, {id: FIRST_PAGE})} />
      </Route>
      <Route exact path={AppRoute.CatalogPage}>
        <CatalogPage />
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  );
}

export default App;
