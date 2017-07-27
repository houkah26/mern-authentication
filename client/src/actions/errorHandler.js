import { has as _has } from "lodash";

// Error handler
export default function errorHandler(dispatch, error, type) {
  console.log(error);

  // check for error message otherwise set as network error
  let errorMessage;
  const containsMessage = _has(error, "data.message");
  if (containsMessage) {
    errorMessage = error.data.message;
  } else {
    errorMessage = "Network Error: Please wait and try again.";
  }

  // if there is no message and status code is 401, send unauthorized error message
  if (_has(error, "status") && error.status === 401 && !containsMessage) {
    dispatch({
      type: type,
      payload: "You are not authorized to do this. Please login and try again."
    });
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}
