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
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});

store.dispatch(APIAction.getGuitars());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <ToastContainer/>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
