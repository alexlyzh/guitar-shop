import GuitarCard from './guitar-card';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { getMockGuitar } from '../../../../utils/mock';

const history = createMemoryHistory();

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitar();

    render(
      <Router history={history}>
        <GuitarCard guitar={guitar} />
      </Router>);

    expect(screen.getByTestId('guitar-price').textContent).toMatch(new RegExp(`${guitar.price}`));
    expect(screen.getByTestId('guitar-name').textContent).toBe(guitar.name);
    expect(screen.getByTestId('guitar-rate-count').textContent)
      .toMatch(new RegExp(`${guitar.comments.length}`));
  });
});
