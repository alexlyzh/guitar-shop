import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import GuitarCard from './guitar-card';
import {getMockComment, Mock} from '../../../../utils/mock';
import {Comment, RemoteDataByID, RequestStatus} from '../../../../types/types';
import {Router} from 'react-router-dom';

const history = createMemoryHistory();

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    const guitar = Mock.guitar;
    const comments: RemoteDataByID<Comment> = {};
    comments[guitar.id] = {
      requestStatus: RequestStatus.SUCCESS,
      data: [getMockComment(guitar.id)],
    };

    render(
      <Router history={history}>
        <GuitarCard guitar={guitar} comments={comments} />
      </Router>);

    expect(screen.getByTestId('guitar-price').textContent).toMatch(new RegExp(`${guitar.price}`));
    expect(screen.getByTestId('guitar-name').textContent).toBe(guitar.name);
    expect(screen.getByTestId('guitar-rate-count').textContent)
      .toMatch(new RegExp(`${comments[guitar.id].data.length}`));
  });
});
