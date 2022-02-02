import { Switch, Route, Redirect } from 'react-router-dom';
import { AppPath } from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import NotFoundPage from '../not-found-page/not-found-page';
import ProductPage from '../product-page/product-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppPath.root} component={() => <Redirect to={AppPath.catalog} />} />
      <Route exact path={AppPath.catalog} component={() => <CatalogPage />} />
      <Route exact path={AppPath.product} component={() => <ProductPage />} />
      <Route component={() => <NotFoundPage />} />
    </Switch>
  );
}

export default App;
