import Cookies from "js-cookie";

// Define the options type for Cookies
interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  [key: string]: any;
}

// Set a cookie
export const setCookie = (
  name: string,
  value: string,
  options?: CookieOptions
): void => {
  Cookies.set(name, value, { ...options });
};

// Get a cookie
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// Remove a cookie
export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};
