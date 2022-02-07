import Characteristics from './characteristics';
import { render, screen } from '@testing-library/react';
import { getMockGuitar } from '../../../utils/mock';

describe('Component: Characteristics', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitar();
    render (<Characteristics product={guitar} label={'fake-label'} />);

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByText(guitar.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${guitar.stringCount}-струнная`)).toBeInTheDocument();
  });
});
