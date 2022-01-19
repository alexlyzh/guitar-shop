import {render, screen} from '@testing-library/react';
import Pagination from './pagination';
import {Mock} from '../../../utils/mock';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {FIRST_PAGE, GUITARS_PER_PAGE} from '../../../const';
import {getRandomInteger} from '../../../utils/common';

const {pagination} = Mock;

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore();

describe('Component: Pagination', () => {
  it('should not be rendered if there are not enough cards', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination
            totalCards={pagination.cardsCount.onePage}
            currentPage={pagination.pageNumber.one}
            guitarsPerPage={GUITARS_PER_PAGE}
            paginate={jest.fn}
          />
        </Router>
      </Provider>);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should be rendered if there are enough cards', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination
            totalCards={pagination.cardsCount.twoPages}
            currentPage={pagination.pageNumber.one}
            guitarsPerPage={GUITARS_PER_PAGE}
            paginate={jest.fn}
          />
        </Router>
      </Provider>);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should correctly render active pagination-page', () => {
    const cardsCount = getRandomInteger(Mock.pagination.cardsCount.twoPages, 100);
    const pagesCount = Math.ceil(cardsCount / GUITARS_PER_PAGE);
    const currentPage = getRandomInteger(FIRST_PAGE, pagesCount);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination
            totalCards={cardsCount}
            currentPage={currentPage}
            guitarsPerPage={GUITARS_PER_PAGE}
            paginate={jest.fn}
          />
        </Router>
      </Provider>);

    const pages = screen.getAllByTestId(/pagination-page/);
    const activePage = screen.getByTestId(/pagination-page-active/);

    expect(pages.indexOf(activePage) + 1).toEqual(currentPage);
  });

  it('should render "previous/next" buttons if current page is neither the first nor the last', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination
            totalCards={pagination.cardsCount.threePages}
            currentPage={pagination.pageNumber.two}
            guitarsPerPage={GUITARS_PER_PAGE}
            paginate={jest.fn}
          />
        </Router>
      </Provider>);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should not render "previous" button if current page is the first', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination
            totalCards={pagination.cardsCount.twoPages}
            currentPage={pagination.pageNumber.one}
            guitarsPerPage={GUITARS_PER_PAGE}
            paginate={jest.fn}
          />
        </Router>
      </Provider>);

    expect(screen.queryByTestId('paginate-prev')).not.toBeInTheDocument();
  });

  it('should not render "next" button if current page is the last', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination
            totalCards={pagination.cardsCount.twoPages}
            currentPage={pagination.pageNumber.two}
            guitarsPerPage={GUITARS_PER_PAGE}
            paginate={jest.fn}
          />
        </Router>
      </Provider>);

    expect(screen.queryByTestId('paginate-next')).not.toBeInTheDocument();
  });
});
