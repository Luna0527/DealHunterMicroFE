import axios from "axios";

const Api = axios.create({
  baseURL: "http://167.172.71.33:31003/api/",
});

export default Api;
