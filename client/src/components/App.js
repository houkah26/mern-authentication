import React, { Component } from 'react'; 
import { Provider } from 'react-redux';  
import { ConnectedRouter } from 'react-router-redux';
import cookie from 'react-cookie';

import store, { history } from '../store'
import { AUTH_USER } from '../actions/types';

import Layout from './layout'

import 'semantic-ui-css/semantic.min.css';
import './App.css'; 

// Check for existing token and auth user if exists
const token = cookie.load('token');
if (token) {  
  store.dispatch({ type: AUTH_USER });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App;
