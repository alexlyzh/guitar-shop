import {SortOrder, SortType} from '../../../const';
import {SortSettings} from '../../../store/reducer/sort-reducer/sort-reducer';

type Props = {
  isDisabled: boolean,
  currentSort: SortSettings,
  onTypePriceClick: () => void,
  onTypeRatingClick: () => void,
  onAscendingOrderClick: () => void,
  onDescendingOrderClick: () => void,
}

export const getSortTypeActiveBtnClassName = (
  currentSort: SortSettings,
  target: SortType,
) => currentSort.type === target ? 'catalog-sort__type-button--active' : '';

export const getSortOrderActiveBtnClassName = (
  currentSort: SortSettings,
  target: SortOrder,
) => currentSort.order === target ? 'catalog-sort__order-button--active' : '';

function Sort({isDisabled, currentSort, onTypePriceClick, onTypeRatingClick, onAscendingOrderClick, onDescendingOrderClick}: Props): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${getSortTypeActiveBtnClassName(currentSort, SortType.PRICE)}`}
          aria-label="по цене"
          onClick={onTypePriceClick}
          disabled={isDisabled}
          tabIndex={currentSort.type === SortType.PRICE ? -1 : 0}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${getSortTypeActiveBtnClassName(currentSort, SortType.RATING)}`}
          aria-label="по популярности"
          onClick={onTypeRatingClick}
          disabled={isDisabled}
          tabIndex={currentSort.type === SortType.RATING ? -1 : 0}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${getSortOrderActiveBtnClassName(currentSort, SortOrder.ASC)}`}
          aria-label="По возрастанию"
          onClick={onAscendingOrderClick}
          disabled={isDisabled}
          tabIndex={currentSort.order === SortOrder.ASC ? -1 : 0}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${getSortOrderActiveBtnClassName(currentSort, SortOrder.DESC)}`}
          aria-label="По убыванию"
          onClick={onDescendingOrderClick}
          disabled={isDisabled}
          tabIndex={currentSort.order === SortOrder.DESC ? -1 : 0}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
