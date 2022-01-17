import {render, screen} from '@testing-library/react';
import Sort from './sort';
import userEvent from '@testing-library/user-event';

describe('Component: CatalogPage', () => {
  const initialSort = {
    type: undefined,
    order: undefined,
  };

  it('should render correctly', () => {
    render(
      <Sort
        isDisabled={false}
        currentSort={initialSort}
        onTypePriceClick={jest.fn}
        onTypeRatingClick={jest.fn}
        onDescendingOrderClick={jest.fn}
        onAscendingOrderClick={jest.fn}
      />);

    expect(screen.getByText(/[Сс]ортировать/)).toBeInTheDocument();
    expect(screen.getByText(/[Пп]о цене/)).toBeInTheDocument();
    expect(screen.getByText(/[Пп]о популярности/)).toBeInTheDocument();
    expect(screen.getByLabelText(/[Пп]о возрастанию/)).toBeInTheDocument();
    expect(screen.getByLabelText(/[Пп]о убыванию/)).toBeInTheDocument();
  });

  it('should call onSortOptionClick when not disabled', () => {
    const onTypePriceClick = jest.fn();
    const onTypeRatingClick = jest.fn();
    const onDescendingOrderClick = jest.fn();
    const onAscendingOrderClick = jest.fn();
    render(
      <Sort
        isDisabled={false}
        currentSort={initialSort}
        onTypePriceClick={onTypePriceClick}
        onTypeRatingClick={onTypeRatingClick}
        onDescendingOrderClick={onDescendingOrderClick}
        onAscendingOrderClick={onAscendingOrderClick}
      />);

    userEvent.click(screen.getByText(/[Пп]о цене/));
    expect(onTypePriceClick).toBeCalled();

    userEvent.click(screen.getByText(/[Пп]о популярности/));
    expect(onTypeRatingClick).toBeCalled();

    userEvent.click(screen.getByLabelText(/[Пп]о возрастанию/));
    expect(onAscendingOrderClick).toBeCalled();

    userEvent.click(screen.getByLabelText(/[Пп]о убыванию/));
    expect(onDescendingOrderClick).toBeCalled();
  });

  it('should not call onSortOptionClick when not disabled', () => {
    const onTypePriceClick = jest.fn();
    const onTypeRatingClick = jest.fn();
    const onDescendingOrderClick = jest.fn();
    const onAscendingOrderClick = jest.fn();
    render(
      <Sort
        isDisabled
        currentSort={initialSort}
        onTypePriceClick={onTypePriceClick}
        onTypeRatingClick={onTypeRatingClick}
        onDescendingOrderClick={onDescendingOrderClick}
        onAscendingOrderClick={onAscendingOrderClick}
      />);

    userEvent.click(screen.getByText(/[Пп]о цене/));
    userEvent.click(screen.getByText(/[Пп]о популярности/));
    userEvent.click(screen.getByLabelText(/[Пп]о возрастанию/));
    userEvent.click(screen.getByLabelText(/[Пп]о убыванию/));

    expect(onTypePriceClick).not.toBeCalled();
    expect(onTypeRatingClick).not.toBeCalled();
    expect(onDescendingOrderClick).not.toBeCalled();
    expect(onAscendingOrderClick).not.toBeCalled();
  });
});
