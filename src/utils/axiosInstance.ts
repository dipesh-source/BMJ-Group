import axios from "axios";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./consts";
import {
  getBase64XeroClients,
  getXeroLoginULR,
  isTokenExpired,
} from "./javascript";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Xero-Tenant-Id": "1cd28a42-6c77-4df1-847f-8af89f7a88ac",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (token && isTokenExpired(token) && !isTokenExpired(refreshToken)) {
      // Token expired, refresh it
      console.log("Token expired, refreshing...");
      try {
        const Authorization = getBase64XeroClients();
        const response = await axios({
          method: "POST",
          url: "https://identity.xero.com/connect/token",
          data: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
          headers: {
            Authorization,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        // Store the new tokens and expiry time
        token = response.data.access_token;
        localStorage.setItem(ACCESS_TOKEN_KEY, token as string);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh_token);
      } catch (error) {
        console.error("Failed to refresh token", error);
        // Clear tokens if refresh fails
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        // Redirect to login
        console.log(" redii:>> ");
        // window.location.href = getXeroLoginULR();
        return Promise.reject(error);
      }
    } else if (isTokenExpired(token) && isTokenExpired(refreshToken)) {
      // Both tokens are expired, redirect to login
      console.log(" redii 12:>> ");
      // window.location.href = getXeroLoginULR();
      return Promise.reject(new Error("Both tokens are expired"));
    }

    // Set the Authorization header with the refreshed or existing token
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
