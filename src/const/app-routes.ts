import { SiteRoute } from '../types/types';

enum AppPath {
  root = '/',
  catalog = '/catalog',
  product = '/catalog/:id',
  cart = '/cart',
}

const siteRoutes: SiteRoute[] = [
  <const>{
    pathname: AppPath.root,
    title: 'Главная',
  },
  <const>{
    pathname: AppPath.catalog,
    title: 'Каталог',
  },
  <const>{
    pathname: AppPath.product,
    title: 'Товар',
  },
  <const>{
    pathname: AppPath.cart,
    title: 'Корзина',
  },
];

enum AppSearchParam {
  page = 'page',
  priceMin = 'price_gte',
  priceMax = 'price_lte',
  type = 'type',
  stringCount = 'stringCount',
}

export { AppPath, AppSearchParam, siteRoutes };
