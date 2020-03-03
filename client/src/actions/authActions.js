import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "./types";

// Load User
export const loadUser = () => dispatch => {
  if (localStorage.tokenUser) {
    setAuthToken(localStorage.tokenUser);
  }
  if (localStorage.tokenUser == null || localStorage.tokenUser == undefined) {
    dispatch({ type: LOGOUT });
    return dispatch({ type: AUTH_ERROR });
  }

  axios
    .get("/api/auth")
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User
export const register = formData => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("/api/user", formData, config)

    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    });
};

// Login User
export const login = formData => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("/api/auth", formData, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
        payload: "err.response.data.msg"
      });
    });
};

// Logout
export const logout = () => dispatch => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS });
