import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';
import rootReducer from './store/reducer/root-reducer';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { createApi } from './api';
import { Provider } from 'react-redux';
import { redirect } from './store/middleware/redirect/redirect';
import { cartAction } from './store/reducer/cart-reducer/cart-reducer';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}).concat([redirect]),
});

store.dispatch(cartAction.add(1));
store.dispatch(cartAction.remove(1));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer/>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
