import axios from "axios";

export const fetchData = ({
  method,
  baseURL = "http://localhost:4000",
  url,
  data,
}) => axios({ method, baseURL, url, data });
