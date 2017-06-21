import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import { Provider } from 'react-redux'; 
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk'; 
// import rootReducer from './reducers/index';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
// import { AUTH_USER } from './actions/types';

// import './index.css';

// const store = createStore(
//   rootReducer,
//   applyMiddleware(reduxThunk)
// );

ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);
registerServiceWorker();

// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );
// registerServiceWorker();
