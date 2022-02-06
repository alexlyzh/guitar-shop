import { SiteRoute } from './types/types';

const MIN_PRICE = 0;
const MIN_CATALOG_HEIGHT = '745px';
const FIRST_PAGE = 1;
const GUITARS_PER_PAGE = 9;
const STARS_COUNT = 5;
const MODAL_FADE_OUT_DURATION = 600;

enum AppPath {
  root = '/',
  catalog = '/catalog',
  product = '/catalog/:id',
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
];

enum AppSearchParam {
  page = 'page',
  priceMin = 'price_gte',
  priceMax = 'price_lte',
  type = 'type',
  stringCount = 'stringCount',
}

const apiRoute = <const>{
  path: <const>{
    guitars: '/guitars',
    guitar: '/guitars/:id',
    guitarComments: '/guitars/:id/comments',
    comments: '/comments',
  },
  search: <const>{
    name: 'name_like',
    sort: '_sort',
    order: '_order',
    priceMin: 'price_gte',
    priceMax: 'price_lte',
    stringCount: 'stringCount',
    type: 'type',
  },
};

const debounceDelay = <const>{
  price: 700,
  search: 250,
};

const stringOptions: Array<number> = [4, 6, 7, 12];
const typeOptions: Array<string> = ['acoustic', 'electric', 'ukulele'];

const stringCount: Record<string, ReadonlyArray<number>> = <const>{
  acoustic: <const> [6, 7, 12],
  ukulele: <const> [4],
  electric: <const> [4, 6, 7],
};

const guitarType: Record<string, Record<string, string>> = <const>{
  acoustic: <const>{
    typeName: 'Акустическая',
    filterName: 'Акустические гитары',
  },
  ukulele: <const>{
    typeName: 'Укулеле',
    filterName: 'Укулеле',
  },
  electric: <const>{
    typeName: 'Электрогитара',
    filterName: 'Электрогитары',
  },
};

const tabLabel = <const>{
  characteristics: <const>{
    en: 'characteristics',
    ru: 'Характеристики',
  },
  description: <const>{
    en: 'description',
    ru: 'Описание',
  },
};

const monthMap: Record<string, string> = <const>{
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
};

const screenTopOptions = <const>{
  top: 0,
  left: 0,
  behavior: 'smooth',
};


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

const initialSort = <const>{
  type: SortType.PRICE,
  order: SortOrder.DESC,
};

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
  MODAL_FADE_OUT_DURATION,
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
  monthMap,
  screenTopOptions
};
