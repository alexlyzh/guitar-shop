const MIN_PRICE = 0;
const DEBOUNCE_DELAY = 700;
const MIN_CATALOG_HEIGHT = '745px';

enum AppRoute {
  Catalog = '/',
}

const apiRoute = {
  path: {
    guitars: '/guitars',
    guitar: '/guitars/:id',
    guitarComments: '/guitars/:id/comments',
    comments: '/comments',
  },
  search: {
    nameLike: 'name_like',
    sort: '_sort',
    order: '_order',
    priceMin: 'price_gte',
    priceMax: 'price_lte',
    stringCount: 'stringCount',
    type: 'type',
  },
};

const stringOptions = [4, 6, 7, 12];

const stringCount: {
  [key: string]: number[],
} = {
  acoustic: [6, 7, 12],
  ukulele: [4],
  electric: [4, 6, 7],
};

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

export {
  MIN_PRICE,
  DEBOUNCE_DELAY,
  MIN_CATALOG_HEIGHT,
  AppRoute,
  apiRoute,
  KeyCode,
  SortType,
  SortOrder,
  GuitarType,
  initialSort,
  stringCount,
  stringOptions
};
