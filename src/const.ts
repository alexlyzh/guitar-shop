import { SiteRoute } from './types/types';
import CatalogPage from './components/catalog-page/catalog-page';
import ProductPage from './components/product-page/product-page';

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

const siteRoutes: SiteRoute[] = [
  {
    pathname: AppPath.root,
    title: 'Главная',
    component: null,
  } as const,
  {
    pathname: AppPath.catalog,
    title: 'Каталог',
    component: CatalogPage,
  } as const,
  {
    pathname: AppPath.product,
    title: 'Товар',
    component: ProductPage,
  } as const,
];

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
    comments: '/comments',
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

const stringOptions: Array<number> = [4, 6, 7, 12];
const typeOptions: Array<string> = ['acoustic', 'electric', 'ukulele'];

const stringCount: Record<string, ReadonlyArray<number>> = {
  acoustic: [6, 7, 12],
  ukulele: [4],
  electric: [4, 6, 7],
};

const guitarType: Record<string, Record<string, string>> = {
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

const tabLabel = {
  characteristics: {
    en: 'characteristics',
    ru: 'Характеристики',
  },
  description: {
    en: 'description',
    ru: 'Описание',
  },
} as const;

const monthMap: Record<string, string> = {
  january: 'января',
  february: 'февраля',
  march: 'марта',
  april: 'апреля',
  may: 'мая',
  june: 'июня',
  july: 'июля',
  august: 'августа',
  september: 'сентября',
  october: 'октября',
  november: 'ноября',
  december: 'декабря',
} as const;

enum SortType {
  PRICE = 'price',
  RATING = 'rating',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum KeyboardKey {
  ESC = 'Escape',
  ENTER = 'Enter',
  TAB = 'Tab',
}

const initialSort = {
  type: SortType.PRICE,
  order: SortOrder.DESC,
} as const;

enum HttpCode {
  OK = 200,
  BadRequest = 400,
  TooManyRequests = 429,
  NotFound = 404,
}

enum AppMessage {
  ErrorOnGetGuitars = 'Что-то сломалось, попробуйте перезагрузить страницу',
  ErrorPostingReview = 'Нужно заполнить все поля формы отзыва',
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
  AppPath,
  AppSearchParam,
  AppMessage,
  apiRoute,
  debounceDelay,
  KeyboardKey,
  SortType,
  SortOrder,
  guitarType,
  initialSort,
  stringCount,
  stringOptions,
  typeOptions,
  siteRoutes,
  tabLabel,
  monthMap
};
