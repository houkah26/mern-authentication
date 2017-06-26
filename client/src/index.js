import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';  
import { ConnectedRouter } from 'react-router-redux';
import cookie from 'react-cookie';

import store, { history } from './store'
import App from './components/App';
import { AUTH_USER } from './actions/types';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

// Check for existing token and auth user if exists
const token = cookie.load('token');
if (token) {  
  store.dispatch({ type: AUTH_USER });
}

const target = document.querySelector('#root')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();
