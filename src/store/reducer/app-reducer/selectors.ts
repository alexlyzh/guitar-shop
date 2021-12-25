import {State} from '../reducer';

const getCurrentSearch = (state: State) => state.APP.search;

export {getCurrentSearch};
