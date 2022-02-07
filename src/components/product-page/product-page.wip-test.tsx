import ProductPage from './product-page';
import thunk from 'redux-thunk';
import { generatePath, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { initialAppState } from '../../store/reducer/app-reducer/app-reducer';
import { initialDataState } from '../../store/reducer/data-reducer/data-reducer';
import { initialFilterState } from '../../store/reducer/filter-reducer/filter-reducer';
import { initialSortState } from '../../store/reducer/sort-reducer/sort-reducer';
import { AppPath } from '../../const';
import { getMockComment, getMockGuitar } from '../../utils/mock';
import { RequestStatus } from '../../types/types';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const guitar = getMockGuitar();
    const comment = getMockComment(guitar.id);
    history.replace(generatePath(AppPath.product, { id: guitar.id }));

    const store = mockStore({
      APP: initialAppState,
      DATA: {
        ...initialDataState,
        guitars: {
          requestStatus: RequestStatus.SUCCESS,
          data: [guitar],
        },
        comments: {
          [guitar.id]: {
            requestStatus: RequestStatus.SUCCESS,
            data: [comment],
          },
        },
      },
      SORT: initialSortState,
      FILTER: initialFilterState,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductPage />
        </Router>
      </Provider>,
    );
  });
});

export {};
