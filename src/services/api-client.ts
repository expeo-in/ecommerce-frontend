import axios from "axios";
import useAuthStore from "../admin/auth-store";

//const baseURL = import.meta.env.VITE_APP_API_BASEURL;
const baseURL = "https://localhost:7058";

const httpClient = axios.create({
  baseURL: baseURL,
});

httpClient.interceptors.request.use(function (config) {
  console.log("axios interceptor triggered");

  const data = JSON.parse(localStorage.getItem("auth") ?? "{}");
  const user = data?.state?.user;
  if (user && user.token) {
    config.headers.Authorization = "Bearer " + user.token;
  }
  return config;
});

const useProtectedHttpClient = () => {
  const user = useAuthStore();
  const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
  return httpClient;
};

export { useProtectedHttpClient };

export default httpClient;
