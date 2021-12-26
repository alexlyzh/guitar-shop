enum AppRoute {
  Root = '/',
}

enum ApiRoute {
  GetGuitars = '/guitars',
  GetGuitar = '/guitars/:id',
  GetComments = '/guitars/:id/comments',
  PostComments = '/comments',
  PostCoupon = '/coupons',
  PostOrders = '/orders',
}

enum HttpCode {
  Unauthorized = 401,
  OK = 200,
  NoContent = 204,
}

enum KeyCode {
  ESC_KEY = 27,
  ENTER_KEY = 13,
}

enum SortOrder {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

enum SortType {
  PRICE = 'PRICE',
  RATING = 'RATING',
}

const initialSort = {
  type: SortType.PRICE,
  order: SortOrder.DESCENDING,
} as const;

export {AppRoute, ApiRoute, HttpCode, KeyCode, SortType, SortOrder, initialSort};
