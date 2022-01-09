import './catalog-cards/catalog-cards.css';
import {Link} from 'react-router-dom';
import {Guitar} from '../../../types/types';
import CatalogSort from './catalog-sort/catalog-sort';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentSort} from '../../../store/reducer/sort-reducer/selectors';
import {SortSettings} from '../../../store/reducer/sort-reducer/sort-reducer';
import {ActionAPI} from '../../../store/api-actions/api-actions';
import CatalogCards from './catalog-cards/catalog-cards';

// const CARDS_PER_PAGE = 6;

type GuitarListProps = {
  guitars: Guitar[],
}

function GuitarList({guitars}: GuitarListProps): JSX.Element {
  const dispatch = useDispatch();
  const currentSort = useSelector(getCurrentSort);

  const onSortOptionClick = (update: SortSettings) => {
    dispatch(ActionAPI.updateSort(update));
  };

  return (
    <>
      <CatalogSort
        isDisabled={!guitars.length}
        currentSort={currentSort}
        onSortOptionClick={onSortOptionClick}
      />

      <CatalogCards guitars={guitars} />

      {guitars.length ?
        <div className="pagination page-content__pagination">
          <ul className="pagination__list">
            <li className="pagination__page pagination__page--active">
              <Link className="link pagination__page-link" to="#">1</Link>
            </li>
            <li className="pagination__page">
              <Link className="link pagination__page-link" to="#">2</Link>
            </li>
            <li className="pagination__page">
              <Link className="link pagination__page-link" to="#">3</Link>
            </li>
            <li className="pagination__page pagination__page--next" id="next">
              <Link className="link pagination__page-link" to="#">Далее</Link>
            </li>
          </ul>
        </div> : null}
    </>
  );
}

export default GuitarList;
