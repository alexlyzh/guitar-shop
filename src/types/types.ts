import {GuitarType} from '../const';

enum RequestStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type RequestedData<Type> = {
  requestStatus: RequestStatus,
  data: Type[],
}

type Price = number | null;

type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: GuitarType,
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

type CouponPost = {
  guitarsIds: number[],
  coupon: string,
}

export {RequestStatus};
export type {
  RequestedData,
  Guitar,
  Comment,
  CommentPost,
  CouponPost,
  Price
};


