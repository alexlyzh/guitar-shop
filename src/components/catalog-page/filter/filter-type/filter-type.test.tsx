import FilterType from './filter-type';
import {render, screen} from '@testing-library/react';
import {GuitarType, GuitarTypeNameSpace} from '../../../../const';
import userEvent from '@testing-library/user-event';

describe('Component: FilterType', () => {
  it('should render correctly', () => {
    const onGuitarTypeChange = jest.fn();

    render(<FilterType onGuitarTypeChange={onGuitarTypeChange} />);

    expect(screen.getByText('Тип гитар')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${GuitarType.acoustic}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${GuitarType.ukulele}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${GuitarType.electric}`))).toBeInTheDocument();
  });

  it('should call onGuitarTypeChange correctly', () => {
    const onGuitarTypeChange = jest.fn();

    render(<FilterType onGuitarTypeChange={onGuitarTypeChange} />);

    userEvent.click(screen.getByText(new RegExp(`${GuitarType.acoustic}`)));
    expect(onGuitarTypeChange).toBeCalledWith(GuitarTypeNameSpace.acoustic);

    userEvent.click(screen.getByText(new RegExp(`${GuitarType.ukulele}`)));
    expect(onGuitarTypeChange).toBeCalledWith(GuitarTypeNameSpace.ukulele);

    userEvent.click(screen.getByText(new RegExp(`${GuitarType.electric}`)));
    expect(onGuitarTypeChange).toBeCalledWith(GuitarTypeNameSpace.electric);
  });
});
