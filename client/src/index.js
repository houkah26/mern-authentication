import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; 
import { BrowserRouter as Router } from 'react-router-dom';
import cookie from 'react-cookie';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import App from './components/App';
import { AUTH_USER } from './actions/types';

// import './index.css';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

// Check for existing token and auth user if exists
const token = cookie.load('token');
if (token) {  
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
