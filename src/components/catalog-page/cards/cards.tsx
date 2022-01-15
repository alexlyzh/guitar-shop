import './cards.css';
import {Guitar} from '../../../types/types';
import {useComments} from '../../../hooks/use-comments/use-comments';
import {AppMessage} from '../../../const';
import GuitarCard from './guitar-card/guitar-card';

type Props = {
  guitars: Guitar[],
}

function Cards({guitars}: Props): JSX.Element {
  const comments = useComments(guitars);

  return (
    <div className={`cards catalog__cards ${!guitars.length ? 'catalog__cards--empty': ''}`}
      data-testid="guitar-cards"
    >
      {guitars.length
        ?
        guitars.map((guitar) => (
          <GuitarCard key={guitar.id} guitar={guitar} comments={comments} />
        )) : AppMessage.NothingFound}
    </div>
  );
}

export default Cards;
