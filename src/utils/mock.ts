import {datatype, internet} from 'faker';
import {stringOptions, typeOptions} from '../const';
import {getRandomInteger} from './common';
import {STARS_COUNT} from '../const';
import {Comment, Guitar} from '../types/types';

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
