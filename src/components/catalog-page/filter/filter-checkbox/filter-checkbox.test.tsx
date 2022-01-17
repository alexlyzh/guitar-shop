import {render, screen} from '@testing-library/react';
import FilterCheckbox from './filter-checkbox';
import {getRandomInteger} from '../../../../utils/common';
import {Mock} from '../../../../utils/mock';
import userEvent from '@testing-library/user-event';

describe('Component: FilterCheckbox', () => {
  it('should render correctly', () => {
    const isStringOption = Boolean(getRandomInteger());
    const value = isStringOption ? Mock.filter.string.value : Mock.filter.type.value;

    render(
      <FilterCheckbox
        id={value}
        name={value}
        onInputChange={jest.fn}
        isChecked={Boolean(getRandomInteger())}
        isDisabled={Boolean(getRandomInteger())}
        labelText={value}
      />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('should call onInputChange when not disabled', () => {
    const onInputChange = jest.fn();

    render(
      <FilterCheckbox
        id={'mock'}
        name={'mock'}
        onInputChange={onInputChange}
        isDisabled={false}
        labelText={'mock'}
      />);

    userEvent.click(screen.getByRole('checkbox'));
    expect(onInputChange).toBeCalled();
  });

  it('should not call onInputChange when disabled', () => {
    const onInputChange = jest.fn();

    render(
      <FilterCheckbox
        id={'mock'}
        name={'mock'}
        onInputChange={onInputChange}
        isDisabled
        labelText={'mock'}
      />);

    userEvent.click(screen.getByRole('checkbox'));
    expect(onInputChange).not.toBeCalled();
  });
});
