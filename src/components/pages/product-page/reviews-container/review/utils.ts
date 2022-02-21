import dayjs from 'dayjs';
import { monthMap } from '../../../../../const/common';

export const formatDate = (date: string) => {
  const month = dayjs(date).format('MMMM');
  const day = dayjs(date).format('D');
  return `${day} ${monthMap[month.toLowerCase()]}`;
};
