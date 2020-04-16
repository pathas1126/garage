import axios from "axios";

const URL = "http://localhost:4000";

export const fetchData = ({ method, url, baseURL = URL, data }) =>
  axios({ method, url, baseURL, data });
