import { datatype, internet } from 'faker';
import { GUITARS_PER_PAGE, STARS_COUNT, stringOptions, typeOptions } from '../const/common';
import { getRandomInteger } from './common';
import {Comment, CommentPost, GuitarWithComments, RemoteDataByID, RequestStatus} from '../types/types';

export const Mock = <const> {
  arrayLength: 3,
  id: 3,
  minPrice: 10,
  maxPrice: 100,
  searchParams: <const> {
    name: 'CURT',
    nameLikeQuery: '/guitars?name_like=CURT',
    sortQuery: '/guitars?_sort=price&_order=asc',
    filterPathnameWithSearchParams: '/guitars?price_gte=23000&price_lte=23000&stringCount=4&type=electric',
    filterSearchParamsOnly: 'price_gte=23000&price_lte=23000&stringCount=4&type=electric',
  },
  guitar: <const> {
    id: 10,
    description: 'Корпус электрогитары окрашен в классический цвет, гриф имеет профиль "C".  Подойдёт для исполнения композиций разных жанров.',
    name:'CURT Classic',
    previewImg: 'img/guitar-7.jpg',
    price: 23000,
    rating: 4,
    stringCount: 4,
    type: 'electric',
    vendorCode: 'TK244556',
  },
  pagination: <const> {
    pageNumber: <const> {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    },
    cardsCount: <const> {
      onePage: GUITARS_PER_PAGE,
      twoPages: GUITARS_PER_PAGE + 1,
      threePages: (GUITARS_PER_PAGE * 2) + 1,
    },
  },
  filter: {
    string: {
      value: '4',
    },
    type: {
      value: 'ukulele',
    },
  },
};

export const getMockGuitar = (): GuitarWithComments => {
  const id = datatype.number();
  return {
    id,
    name: internet.userName(),
    vendorCode: datatype.string(),
    type: typeOptions[getRandomInteger(0, typeOptions.length - 1)],
    description: datatype.string(),
    previewImg: internet.url(),
    stringCount: stringOptions[getRandomInteger(0, stringOptions.length - 1)],
    rating: datatype.number(STARS_COUNT),
    price: datatype.number(),
    comments: Array.from({ length: Mock.arrayLength }, () => getMockComment(id)),
  };
};

export const getMockComment = (guitarId: number): Comment => ({
  guitarId,
  id: datatype.string(),
  userName: internet.userName(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  comment: datatype.string(),
  rating: datatype.number(STARS_COUNT),
  createAt: new Date().toISOString(),
});

export const getMockCommentPost = (guitarId: number, comment: Comment): CommentPost => ({
  guitarId,
  userName: comment.userName,
  advantage: comment.advantage,
  disadvantage: comment.disadvantage,
  comment: comment.comment,
  rating: comment.rating,
});

export const mockGuitarsWithComments = () => {
  const guitars = Array.from({length: Mock.arrayLength}, getMockGuitar);

  const comments: RemoteDataByID<Comment> = {};
  guitars.forEach((guitar) => {
    comments[guitar.id] = {
      requestStatus: RequestStatus.SUCCESS,
      data: [getMockComment(guitar.id)],
    };
  });
  return {guitars, comments};
};
