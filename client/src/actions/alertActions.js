import uuid from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "./types";

// Set Alert
export const setAlert = (
  msg,
  type,
  timeout = 3000,
  dispatch = null
) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

// Remove Alert
export const removeAlert = id => dispatch => {
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }));
};
