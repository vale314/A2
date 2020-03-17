import { TEXT_SAVE, TEXT_REMOVE } from "../actions/types";

const initialState = {
  text: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEXT_SAVE:
      return { ...state, text: action.payload };
    case TEXT_REMOVE:
      return { ...state, text: "" };
    default:
      return state;
  }
};
