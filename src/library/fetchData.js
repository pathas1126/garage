import axios from "axios";

export const fetchData = ({ method, url, data, header }) =>
  axios({ method, url, data, header });
