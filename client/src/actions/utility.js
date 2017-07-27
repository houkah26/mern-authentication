import { push } from "react-router-redux";

import { CLEAR_ERROR } from "../actions/types";

//= =====================
// Utility Actions
//= =====================
export function changeRoute(route) {
  return function(dispatch) {
    dispatch({ type: CLEAR_ERROR });
    dispatch(push(route));
  };
}
