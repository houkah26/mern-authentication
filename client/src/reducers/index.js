import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
  
import authReducer from './auth_reducer';

export default combineReducers({  
  auth: authReducer,
  router: routerReducer,
  form: formReducer
});

