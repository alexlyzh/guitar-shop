import {Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import CatalogPage from '../catalog-page/catalog-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Catalog}>
        <CatalogPage />
      </Route>
    </Switch>
  );
}

export default App;
