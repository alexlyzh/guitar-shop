import GuitarCard from './guitar-card/guitar-card';
import './cards.css';
import { GuitarWithComments } from '../../../types/types';
import { AppMessage } from '../../../const';

type Props = {
  guitars: GuitarWithComments[],
}

function Cards({guitars}: Props): JSX.Element {
  return (
    <div className={`cards catalog__cards ${!guitars.length ? 'catalog__cards--empty': ''}`}
      data-testid="guitar-cards"
    >
      {guitars.length
        ?
        guitars.map((guitar) => (
          <GuitarCard key={guitar.id} guitar={guitar} />
        )) : AppMessage.NothingFound}
    </div>
  );
}

export default Cards;
