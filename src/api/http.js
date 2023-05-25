import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    //baseURL: "http://70.12.50.200:9080/board10",
    baseURL: "http://70.12.50.221:9080/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance };
