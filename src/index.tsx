import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';
import rootReducer from './store/reducer/root-reducer';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { Provider } from 'react-redux';
import { redirect } from './store/middleware/redirect/redirect';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}).concat([redirect]),
});

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
