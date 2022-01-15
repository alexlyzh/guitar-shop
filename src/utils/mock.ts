import {datatype, internet} from 'faker';
import {GUITARS_PER_PAGE, STARS_COUNT, stringOptions, typeOptions} from '../const';
import {getRandomInteger} from './common';
import {Comment, Guitar, RemoteDataByID, RequestStatus} from '../types/types';

export const getMockGuitar = (): Guitar => ({
  id: datatype.number(),
  name: internet.userName(),
  vendorCode: datatype.string(),
  type: typeOptions[getRandomInteger(0, typeOptions.length - 1)],
  description: datatype.string(),
  previewImg: internet.url(),
  stringCount: stringOptions[getRandomInteger(0, stringOptions.length - 1)],
  rating: datatype.number(STARS_COUNT),
  price: datatype.number(),
});

export const getMockComment = (guitarId: number): Comment => ({
  id: datatype.string(),
  userName: internet.userName(),
  advantages: datatype.string(),
  disadvantages: datatype.string(),
  comment: datatype.string(),
  rating: datatype.number(STARS_COUNT),
  createAt: new Date().toISOString(),
  guitarId,
});

export const Mock = {
  arrayLength: 3,
  id: 3,
  minPrice: 10,
  maxPrice: 100,
  searchParams: {
    name: 'CURT',
    nameLikeQuery: '/guitars?name_like=CURT',
    sortQuery: '/guitars?_sort=price&_order=asc',
    filterQuery: '/guitars?price_gte=23000&price_lte=23000&stringCount=4&type=electric',
  },
  guitar: {
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
  pagination: {
    pageNumber: {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    },
    cardsCount: {
      onePage: GUITARS_PER_PAGE,
      twoPages: GUITARS_PER_PAGE + 1,
      threePages: (GUITARS_PER_PAGE * 2) + 1,
    },
  },
} as const;

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
