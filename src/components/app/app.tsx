import CatalogPage from '../pages/catalog-page/catalog-page';
import CartPage from '../pages/cart-page/cart-page';
import ProductPage from '../pages/product-page/product-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AppPath } from '../../const/app-routes';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppPath.root}>
        <Redirect to={AppPath.catalog} />
      </Route>
      <Route exact path={AppPath.catalog} component={CatalogPage} />
      <Route exact path={AppPath.product} component={ProductPage} />
      <Route exact path={AppPath.cart} component={CartPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
