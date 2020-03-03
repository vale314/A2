import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["tokenUser"] = token;
  } else {
    delete axios.defaults.headers.common["tokenUser"];
  }
};

export default setAuthToken;
