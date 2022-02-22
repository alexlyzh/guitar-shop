import { Breadcrumb } from '../types/types';

enum AppPath {
  root = '/',
  catalog = '/catalog',
  product = '/catalog/:id',
  cart = '/cart',
}

const breadcrumb: Record<AppPath, Breadcrumb> = {
  [AppPath.root]: {
    pathname: AppPath.root,
    title: 'Главная',
  },
  [AppPath.catalog]: {
    pathname: AppPath.catalog,
    title: 'Каталог',
  },
  [AppPath.product]: {
    pathname: AppPath.product,
    title: 'Товар',
  },
  [AppPath.cart]: {
    pathname: AppPath.cart,
    title: 'Корзина',
  },
};

enum AppSearchParam {
  page = 'page',
  priceMin = 'price_gte',
  priceMax = 'price_lte',
  type = 'type',
  stringCount = 'stringCount',
}

export { AppPath, AppSearchParam, breadcrumb };
