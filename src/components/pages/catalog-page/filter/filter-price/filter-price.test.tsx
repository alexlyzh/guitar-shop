import {render, screen, waitFor} from '@testing-library/react';
import FilterPrice from './filter-price';
import {Mock} from '../../../../../utils/mock';
import userEvent from '@testing-library/user-event';

describe('Component: FilterPrice', () => {
  it('should render correctly', () => {
    render(
      <FilterPrice
        minPriceLimit={Mock.minPrice}
        maxPriceLimit={Mock.maxPrice}
        onPriceMinInput={jest.fn}
        onPriceMaxInput={jest.fn}
      />);

    expect(screen.getByText('Минимальная цена')).toBeInTheDocument();
    expect(screen.getByText('Максимальная цена')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(Mock.minPrice.toString())).toBeInTheDocument();
    expect(screen.getByPlaceholderText(Mock.maxPrice.toString())).toBeInTheDocument();
  });

  it('should call onChange callbacks', async () => {
    const onPriceMinChange = jest.fn();
    const onPriceMaxChange = jest.fn();
    render(
      <FilterPrice
        minPriceLimit={Mock.minPrice}
        maxPriceLimit={Mock.maxPrice}
        onPriceMinInput={onPriceMinChange}
        onPriceMaxInput={onPriceMaxChange}
      />);

    const priceInputs = screen.getAllByRole('spinbutton');
    const [minPriceInput, maxPriceInput] = priceInputs;
    userEvent.type(minPriceInput, Mock.minPrice.toString());
    await waitFor(() => expect(onPriceMinChange).toBeCalledTimes(1));

    userEvent.type(maxPriceInput, Mock.maxPrice.toString());
    await waitFor(() => expect(onPriceMaxChange).toBeCalledTimes(1));
  });
});
