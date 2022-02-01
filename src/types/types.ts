import {AppPath} from '../const';

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

type ParentKey = keyof typeof AppPath;

type SiteMap = {
  [K in ParentKey]: {
    path: AppPath;
    parent: K extends 'root' ? null : ParentKey;
  };
};

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
  advantage: string,
  disadvantage: string,
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

export {RequestStatus};
export type {
  RemoteData,
  RemoteDataByID,
  Guitar,
  Comment,
  CommentPost,
  SiteMap
};
