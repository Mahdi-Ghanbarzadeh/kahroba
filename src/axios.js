import axios from "axios";
// const baseUrl = "http://internetengineering.pythonanywhere.com/";
const baseUrl = "https://api.feshin.me/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization:
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== undefined &&
      localStorage.getItem("token") !== "undefined"
        ? "Token " + localStorage.getItem("token")
        : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
