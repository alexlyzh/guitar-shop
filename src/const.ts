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

export {AppRoute, ApiRoute, HttpCode};
