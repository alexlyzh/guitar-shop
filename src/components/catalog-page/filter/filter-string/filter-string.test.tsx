import FilterString from './filter-string';
import {render, screen} from '@testing-library/react';
import {stringOptions} from '../../../../const';
import userEvent from '@testing-library/user-event';

describe('Component: FilterType', () => {
  it('should render correctly', () => {
    render(
      <FilterString
        types={[]}
        onStringsFilterChange={ jest.fn }
        selectedStrings={stringOptions}
        availableStringsForSelectedTypes={stringOptions}
      />);

    expect(screen.getByText('Количество струн')).toBeInTheDocument();
    stringOptions.forEach((stringsCount) => {
      expect(screen.getByLabelText(`${stringsCount}-strings`)).toBeInTheDocument();
    });
  });


  it('should correctly render checked string-checkboxes', () => {
    render(
      <FilterString
        types={[]}
        onStringsFilterChange={ jest.fn }
        selectedStrings={ stringOptions }
        availableStringsForSelectedTypes={stringOptions}
      />);

    expect(screen.getAllByTestId(/checked-true/).length).toEqual(stringOptions.length);

    render(
      <FilterString
        types={[]}
        onStringsFilterChange={ jest.fn }
        selectedStrings={ [] }
        availableStringsForSelectedTypes={[]}
      />);

    expect(screen.getAllByTestId(/checked-false/).length).toEqual(stringOptions.length);
  });


  it('should correctly render disabled string-checkboxes', () => {
    render(
      <FilterString
        types={[]}
        onStringsFilterChange={ jest.fn}
        selectedStrings={ [] }
        availableStringsForSelectedTypes={stringOptions}
      />);

    expect(screen.getAllByTestId(/disabled-false/).length).toEqual(stringOptions.length);

    render(
      <FilterString
        types={['fake']}
        onStringsFilterChange={ jest.fn }
        selectedStrings={ [] }
        availableStringsForSelectedTypes={ [] }
      />);

    expect(screen.getAllByTestId(/disabled-true/).length).toEqual(stringOptions.length);
  });


  it('should call onStringsFilterChange', () => {
    const onStringsFilterChange = jest.fn();
    render(
      <FilterString
        types={[]}
        onStringsFilterChange={ onStringsFilterChange }
        selectedStrings={ [] }
        availableStringsForSelectedTypes={[]}
      />);

    stringOptions.forEach((stringsCount) => {
      userEvent.click(screen.getByLabelText(`${stringsCount}-strings`));
      expect(onStringsFilterChange).toBeCalledWith(stringsCount);
    });

    expect(onStringsFilterChange).toBeCalledTimes(stringOptions.length);
  });
});
