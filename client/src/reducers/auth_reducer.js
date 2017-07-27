import {
  AUTH_USER,
  UNAUTH_USER,
  ERROR,
  PROTECTED_TEST,
  UPDATE_USER,
  CLEAR_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  error: "",
  content: "",
  authenticated: false,
  user: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.user, error: "", authenticated: true };
    case UNAUTH_USER:
      return { ...INITIAL_STATE };
    case ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    case UPDATE_USER:
      return { ...state, user: action.user, error: "" };
    case CLEAR_ERROR:
      return { ...state, error: "" };
    default:
      return state;
  }
}
