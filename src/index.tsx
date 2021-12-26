import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import App from './components/app/app';
import browserHistory from './browser-history';
import {createApi} from './api';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import rootReducer from './store/reducer/root-reducer';
import {APIAction} from './store/api-actions';
import {processSortChange} from './store/reducer/middlewares/process-sort-change/process-sort-change';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: {extraArgument: api}}).concat(processSortChange),
});

store.dispatch(APIAction.getGuitars());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
