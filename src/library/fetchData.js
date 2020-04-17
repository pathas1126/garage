import axios from "axios";

export const fetchData = ({ method, url, data, header = new Headers() }) =>
  axios({ method, url, data, header });
