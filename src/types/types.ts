import { AppPath } from '../const';

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

type SiteRoute = {
  pathname: AppPath,
  title: string,
}

export {RequestStatus};
export type {
  RemoteData,
  RemoteDataByID,
  Guitar,
  GuitarWithComments,
  Comment,
  CommentPost,
  ReviewFormState,
  SiteRoute
};
