import axios from "axios";

export const fetchData = ({ method, url, data }) =>
  axios({ method, url, data });
