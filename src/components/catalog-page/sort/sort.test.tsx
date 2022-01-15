import {render, screen} from '@testing-library/react';
import Sort from './sort';
import userEvent from '@testing-library/user-event';
import {SortOrder, SortType} from '../../../const';

describe('Component: CatalogPage', () => {
  const onSortOptionClick = jest.fn();
  const initialSort = {
    type: undefined,
    order: undefined,
  };

  it('should render correctly', () => {
    render(
      <Sort
        isDisabled={false}
        currentSort={initialSort}
        onSortOptionClick={onSortOptionClick}
      />);

    expect(screen.getByText(/[Сс]ортировать/)).toBeInTheDocument();
    expect(screen.getByText(/[Пп]о цене/)).toBeInTheDocument();
    expect(screen.getByText(/[Пп]о популярности/)).toBeInTheDocument();
    expect(screen.getByLabelText(/[Пп]о возрастанию/)).toBeInTheDocument();
    expect(screen.getByLabelText(/[Пп]о убыванию/)).toBeInTheDocument();
  });

  it('should call onSortOptionClick when not disabled', () => {
    render(
      <Sort
        isDisabled={false}
        currentSort={initialSort}
        onSortOptionClick={onSortOptionClick}
      />);

    userEvent.click(screen.getByText(/[Пп]о цене/));
    expect(onSortOptionClick).toBeCalledTimes(1);
    expect(onSortOptionClick).toBeCalledWith({type: SortType.PRICE});

    userEvent.click(screen.getByText(/[Пп]о популярности/));
    expect(onSortOptionClick).toBeCalledTimes(2);
    expect(onSortOptionClick).toBeCalledWith({type: SortType.RATING});

    userEvent.click(screen.getByLabelText(/[Пп]о возрастанию/));
    expect(onSortOptionClick).toBeCalledTimes(3);
    expect(onSortOptionClick).toBeCalledWith({order: SortOrder.ASC});

    userEvent.click(screen.getByLabelText(/[Пп]о убыванию/));
    expect(onSortOptionClick).toBeCalledTimes(4);
    expect(onSortOptionClick).toBeCalledWith({order: SortOrder.DESC});
  });

  it('should not call onSortOptionClick when not disabled', () => {
    render(
      <Sort
        isDisabled
        currentSort={initialSort}
        onSortOptionClick={onSortOptionClick}
      />);

    userEvent.click(screen.getByText(/[Пп]о цене/));
    userEvent.click(screen.getByText(/[Пп]о популярности/));
    userEvent.click(screen.getByLabelText(/[Пп]о возрастанию/));
    userEvent.click(screen.getByLabelText(/[Пп]о убыванию/));

    expect(onSortOptionClick).not.toBeCalled();
  });
});
