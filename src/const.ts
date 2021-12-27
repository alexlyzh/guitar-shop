enum AppRoute {
  Root = '/',
}

enum ApiPath {
  GetGuitars = '/guitars',
  GetGuitar = '/guitars/:id',
  GetComments = '/guitars/:id/comments',
  PostComments = '/comments',
  PostCoupon = '/coupons',
  PostOrders = '/orders',
}

enum ApiSearch {
  ByName = '?name_like=',
}

enum HttpCode {
  Unauthorized = 401,
  OK = 200,
  NoContent = 204,
}

enum KeyCode {
  ESC = 27,
  ENTER = 13,
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum SortType {
  PRICE = 'price',
  RATING = 'rating',
}

const initialSort = {
  type: SortType.PRICE,
  order: SortOrder.DESC,
} as const;

export {AppRoute, ApiPath, ApiSearch, HttpCode, KeyCode, SortType, SortOrder, initialSort};
