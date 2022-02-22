import Description from './description';
import { render, screen } from '@testing-library/react';
import { getMockGuitarWithComments } from '../../../../utils/mock';

describe('Component: Description', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitarWithComments();
    render (<Description product={guitar} label={'fake-label'} />);

    expect(screen.getByText(guitar.description)).toBeInTheDocument();
  });
});
