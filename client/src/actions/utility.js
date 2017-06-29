import { push } from 'react-router-redux';

//= =====================
// Utility Actions
//= =====================
export function changeRoute(route) {
  return function(dispatch) {
    dispatch(push(route));
  }
};