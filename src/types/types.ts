enum RequestStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type RemoteData<Type> = {
  requestStatus: RequestStatus,
  data: Type[],
}

type RemoteDataByID<Type> = {
  [key: number]: RemoteData<Type>,
}

type Price = number | null;
enum FilterOption {
  STRING = 'STRING',
  TYPE = 'TYPE',
}

type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
}

type Comment = {
  id: string,
  userName: string,
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

type CommentPost = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

export {RequestStatus, FilterOption};
export type {
  RemoteData,
  RemoteDataByID,
  Guitar,
  Comment,
  CommentPost,
  Price
};
