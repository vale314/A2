import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import textReducer from "./text";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  text: textReducer
});
