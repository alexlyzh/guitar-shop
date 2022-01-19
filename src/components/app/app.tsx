import {Switch, Route, Redirect} from 'react-router-dom';
import {AppPath} from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import NotFoundPage from '../not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppPath.Main}>
        <Redirect to={AppPath.Catalog} />
      </Route>
      <Route exact path={AppPath.Catalog}>
        <CatalogPage />
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  );
}

export default App;
