import Cards from './cards';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockGuitarsWithComments } from '../../../utils/mock';
import { GuitarWithComments, RequestStatus } from '../../../types/types';
import { AppMessage } from '../../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: NotFoundPage', () => {
  it('should render correctly if guitars found', () => {
    const {guitars, comments} = mockGuitarsWithComments();
    const store = mockStore({
      DATA: {
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: guitars,
        },
        comments,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Cards guitars={guitars} />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByTestId('product-card').length).toEqual(guitars.length);
  });

  it('should render correctly if guitars not found', () => {
    const guitars: GuitarWithComments[] = [];
    const store = mockStore({
      DATA: {
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: guitars,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Cards guitars={guitars} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(AppMessage.NothingFound)).toBeInTheDocument();
  });
});
