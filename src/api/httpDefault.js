import axios from "axios";
export default axios.create({
  //baseURL: "http://70.12.50.200:9080/board10",
  baseURL: "http://localhost:9080/PongPongTrip",
  headers: {
    "Content-Type": "application/json",
  },
});

