import {State} from '../root-reducer';

const getGuitars = (state: State) => state.DATA.guitars;
const getCatalogPriceRange = (state: State) => state.DATA.priceRange;

export {getGuitars, getCatalogPriceRange};
