import axios from "axios";

export const fetchData = ({ method, baseURL = "/", url, data }) =>
  axios({ method, baseURL, url, data });
