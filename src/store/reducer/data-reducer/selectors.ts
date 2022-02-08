import {State} from '../root-reducer';
import {Comment, RemoteDataByID, RequestStatus} from '../../../types/types';
import {createSelector} from '@reduxjs/toolkit';

const getGuitars = (state: State) => state.DATA.guitars;
const getCatalogPriceRange = (state: State) => state.DATA.priceRange;

const getComments = createSelector(
  getGuitars,
  (guitars) => guitars.data.reduce((comments, guitar) => {
    comments[guitar.id] = {
      requestStatus: RequestStatus.SUCCESS,
      data: guitar.comments,
    };
    return comments;
  }, {} as RemoteDataByID<Comment>));

export { getGuitars, getCatalogPriceRange, getComments };
