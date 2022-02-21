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
    embed: '_embed',
  },
};

export { apiRoute };
