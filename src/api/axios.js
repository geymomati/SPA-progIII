import axios from "axios";

 const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  timeout: 10000,
});
export default axiosInstance;