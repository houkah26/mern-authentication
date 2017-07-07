import { AUTH_USER,  
         UNAUTH_USER,
         AUTH_ERROR,
         PROTECTED_TEST,
         UPDATE_USER } from '../actions/types';

const INITIAL_STATE = { error: '', content: '', authenticated: false, user: {}}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, user: action.user, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...INITIAL_STATE };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    case UPDATE_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}