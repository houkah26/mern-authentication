import React, { Component } from 'react'; 
import { Provider } from 'react-redux';  
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from '../store'

import MainContainer from '../containers/MainContainer'

import 'semantic-ui-css/semantic.min.css';
import './App.css'; 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainContainer />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App;
