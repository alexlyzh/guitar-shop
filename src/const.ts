const MIN_PRICE = 0;
const DEBOUNCE_DELAY = 500;

enum AppRoute {
  Root = '/',
}

const apiRoute = {
  path: {
    guitars: '/guitars',
    guitar: '/guitars/:id',
    guitarComments: '/guitars/:id/comments',
    comments: '/comments',
    coupons: '/coupons',
    orders: '/orders',
  },
  search: {
    nameLike: 'name_like',
    sort: '_sort',
    order: '_order',
    priceMin: 'price_gte',
    priceMax: 'price_lte',
  },
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
  AppRoute,
  apiRoute,
  KeyCode,
  SortType,
  SortOrder,
  GuitarType,
  initialSort
};
