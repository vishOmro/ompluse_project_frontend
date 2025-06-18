import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://omplusebackend.onrender.com/api", // Update with your Phoenix API URL
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    // console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
