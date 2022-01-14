const MIN_PRICE = 0;
const DEBOUNCE_DELAY = 700;
const MIN_CATALOG_HEIGHT = '745px';
const FIRST_PAGE = 1;
const GUITARS_PER_PAGE = 9;
const STARS_COUNT = 5;

enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/page_:id',
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

const stringOptions = [4, 6, 7, 12];
const typeOptions = ['acoustic', 'ukulele', 'electric'];

const stringCount: {
  [key: string]: number[],
} = {
  acoustic: [6, 7, 12],
  ukulele: [4],
  electric: [4, 6, 7],
};

enum GuitarTypeNameSpace {
  acoustic = 'acoustic',
  ukulele = 'ukulele',
  electric = 'electric',
}

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
}

enum AppMessage {
  ErrorOnGetAllGuitars = 'Что-то сломалось, попробуйте перезагрузить страницу',
  CatalogPageHeading = 'Каталог гитар',
  NothingFound = 'Ничего не нашлось',
}

export {
  MIN_PRICE,
  DEBOUNCE_DELAY,
  MIN_CATALOG_HEIGHT,
  FIRST_PAGE,
  GUITARS_PER_PAGE,
  STARS_COUNT,
  HttpCode,
  AppRoute,
  AppMessage,
  apiRoute,
  KeyCode,
  SortType,
  SortOrder,
  GuitarTypeNameSpace,
  initialSort,
  stringCount,
  stringOptions,
  typeOptions
};
