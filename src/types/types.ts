import { AppPath } from '../const/app-routes';

enum RequestStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

enum ModalType {
  review = 'review',
  productCart = 'productCart',
  catalogCart = 'catalogCart',
}

type RemoteData<Type> = {
  requestStatus: RequestStatus,
  data: Type[],
}

type RemoteDataByID<Type> = Record<number, RemoteData<Type>>;

type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
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

type GuitarWithComments = Guitar & {
  comments: Comment[],
}

type CommentPost = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

type ReviewFormState = {
  'user-name': string,
  rate?: string,
  advantage: string,
  disadvantage: string,
  review: string,
}

type CartItem = {
  guitar: Guitar,
  count: number,
}

type Breadcrumb = {
  pathname: AppPath,
  title: string,
}

type Discount = {
  size: number,
  coupon: string,
  requestStatus: RequestStatus,
}

export { RequestStatus, ModalType };
export type {
  RemoteData,
  RemoteDataByID,
  Guitar,
  GuitarWithComments,
  Comment,
  CommentPost,
  ReviewFormState,
  CartItem,
  Breadcrumb,
  Discount
};
