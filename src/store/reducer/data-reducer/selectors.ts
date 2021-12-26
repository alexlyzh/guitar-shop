import {State} from '../root-reducer';

const getGuitars = (state: State) => state.DATA.guitars;

export {getGuitars};
