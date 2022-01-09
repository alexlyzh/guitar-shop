import {SortOrder, SortType} from '../../../../const';
import {SortSettings} from '../../../../store/reducer/sort-reducer/sort-reducer';

type Props = {
  isDisabled: boolean,
  currentSort: SortSettings,
  onSortOptionClick: (update: SortSettings) => void,
}

export const getSortTypeBtnClassName = (
  currentSort: SortSettings,
  target: SortType,
) => currentSort.type === target ? 'catalog-sort__type-button--active' : '';

export const getSortOrderBtnClassName = (
  currentSort: SortSettings,
  target: SortOrder,
) => currentSort.order === target ? 'catalog-sort__order-button--active' : '';

function CatalogSort({isDisabled, currentSort, onSortOptionClick}: Props): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${getSortTypeBtnClassName(currentSort, SortType.PRICE)}`}
          aria-label="по цене"
          onClick={() => onSortOptionClick({type: SortType.PRICE})}
          disabled={isDisabled}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${getSortTypeBtnClassName(currentSort, SortType.RATING)}`}
          aria-label="по популярности"
          onClick={() => onSortOptionClick({type: SortType.RATING})}
          disabled={isDisabled}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${getSortOrderBtnClassName(currentSort, SortOrder.ASC)}`}
          aria-label="По возрастанию"
          onClick={() => onSortOptionClick({order: SortOrder.ASC})}
          disabled={isDisabled}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${getSortOrderBtnClassName(currentSort, SortOrder.DESC)}`}
          aria-label="По убыванию"
          onClick={() => onSortOptionClick({order: SortOrder.DESC})}
          disabled={isDisabled}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
