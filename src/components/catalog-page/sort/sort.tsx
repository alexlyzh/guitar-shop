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

export const getSortTypeBtnClassName = (
  currentSort: SortSettings,
  target: SortType,
) => currentSort.type === target ? 'catalog-sort__type-button--active' : '';

export const getSortOrderBtnClassName = (
  currentSort: SortSettings,
  target: SortOrder,
) => currentSort.order === target ? 'catalog-sort__order-button--active' : '';

function Sort({isDisabled, currentSort, onTypePriceClick, onTypeRatingClick, onAscendingOrderClick, onDescendingOrderClick}: Props): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${getSortTypeBtnClassName(currentSort, SortType.PRICE)}`}
          aria-label="по цене"
          onClick={onTypePriceClick}
          disabled={isDisabled}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${getSortTypeBtnClassName(currentSort, SortType.RATING)}`}
          aria-label="по популярности"
          onClick={onTypeRatingClick}
          disabled={isDisabled}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${getSortOrderBtnClassName(currentSort, SortOrder.ASC)}`}
          aria-label="По возрастанию"
          onClick={onAscendingOrderClick}
          disabled={isDisabled}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${getSortOrderBtnClassName(currentSort, SortOrder.DESC)}`}
          aria-label="По убыванию"
          onClick={onDescendingOrderClick}
          disabled={isDisabled}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
