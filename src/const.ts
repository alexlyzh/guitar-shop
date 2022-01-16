const MIN_PRICE = 0;
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

const debounceDelay = {
  price: 700,
  search: 250,
} as const;

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

enum GuitarType {
  acoustic = 'Акустические гитары',
  ukulele = 'Укулеле',
  electric = 'Электрогитары',
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
  AppRoute,
  AppMessage,
  apiRoute,
  debounceDelay,
  KeyCode,
  SortType,
  SortOrder,
  GuitarTypeNameSpace,
  GuitarType,
  initialSort,
  stringCount,
  stringOptions,
  typeOptions
};
