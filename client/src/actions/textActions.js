import axios from "axios";

import { TEXT_SAVE, TEXT_REMOVE } from "./types";

//Save Text
export const text_save = formData => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios
    .post("/api/register/text", formData, config)

    .then(res => {
      dispatch({
        type: TEXT_SAVE,
        payload: formData
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const text_remove = dispatch => {
  dispatch({ type: TEXT_SAVE, TEXT_REMOVE });
};
