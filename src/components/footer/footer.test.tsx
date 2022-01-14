import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Footer from './footer';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Footer/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText(/[Мм]агазин гитар/)).toBeInTheDocument();
    expect(screen.getByText(/гитарная мастерская/)).toBeInTheDocument();
  });
});
