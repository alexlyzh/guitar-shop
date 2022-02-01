import {SiteMap} from './types/types';

const MIN_PRICE = 0;
const MIN_CATALOG_HEIGHT = '745px';
const FIRST_PAGE = 1;
const GUITARS_PER_PAGE = 9;
const STARS_COUNT = 5;

enum AppPath {
  root = '/',
  catalog = '/catalog',
  product = '/catalog/:id',
}

const siteMap: SiteMap = {
  root: {
    path: AppPath.root,
    parent: null,
  },
  catalog: {
    path: AppPath.catalog,
    parent: 'root',
  },
  product: {
    path: AppPath.product,
    parent: 'catalog',
  },
};

enum AppSearchParam {
  page = 'page',
  priceMin = 'price_gte',
  priceMax = 'price_lte',
  type = 'type',
  stringCount = 'stringCount',
}

const apiRoute = {
  path: {
    guitars: '/guitars',
    guitar: '/guitars/:id',
    guitarComments: '/guitars/:id/comments',
  },
  search: {
    name: 'name_like',
    sort: '_sort',
    order: '_order',
    priceMin: 'price_gte',
    priceMax: 'price_lte',
    stringCount: 'stringCount',
    type: 'type',
  },
};

const debounceDelay = {
  price: 700,
  search: 250,
} as const;

const stringOptions = [4, 6, 7, 12];
const typeOptions = ['acoustic', 'electric', 'ukulele'];

const stringCount: Record<string, number[]> = {
  acoustic: [6, 7, 12],
  ukulele: [4],
  electric: [4, 6, 7],
};

const GuitarType: Record<string, Record<string, string>> = {
  acoustic: {
    typeName: 'Акустическая',
    filterName: 'Акустические гитары',
  },
  ukulele: {
    typeName: 'Укулеле',
    filterName: 'Укулеле',
  },
  electric: {
    typeName: 'Электрогитара',
    filterName: 'Электрогитары',
  },
} as const;

const month: Record<number, string> = {
  0: 'января',
  1: 'февраля',
  2: 'марта',
  3: 'апреля',
  4: 'мая',
  5: 'июня',
  6: 'июля',
  7: 'августа',
  8: 'сентября',
  9: 'октября',
  10: 'ноября',
  11: 'декабря',
} as const;

enum SortType {
  PRICE = 'price',
  RATING = 'rating',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum KeyCode {
  ESC = 27,
  ENTER = 13,
}

const initialSort = {
  type: SortType.PRICE,
  order: SortOrder.DESC,
} as const;

enum HttpCode {
  OK = 200,
  TooManyRequests = 429,
  NotFound = 404,
}

enum AppMessage {
  ErrorOnGetGuitars = 'Что-то сломалось, попробуйте перезагрузить страницу',
  CatalogPageHeading = 'Каталог гитар',
  ProductPageHeading = 'Товар',
  CatalogFilterHeading = 'Фильтр',
  CatalogSortHeading = 'Сортировать',
  NothingFound = 'Ничего не нашлось',
}

export {
  MIN_PRICE,
  MIN_CATALOG_HEIGHT,
  FIRST_PAGE,
  GUITARS_PER_PAGE,
  STARS_COUNT,
  HttpCode,
  AppPath,
  AppSearchParam,
  AppMessage,
  apiRoute,
  debounceDelay,
  KeyCode,
  SortType,
  SortOrder,
  GuitarType,
  initialSort,
  stringCount,
  stringOptions,
  typeOptions,
  siteMap,
  month
};
