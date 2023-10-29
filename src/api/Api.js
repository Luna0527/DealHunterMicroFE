import axios from "axios";

const Api = axios.create({
  // baseURL: 'https://store.appdev.my.id/api'
  baseURL: "http://167.172.71.33:31003/api/",
});

export default Api;
