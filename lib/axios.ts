import axios from "axios";

const url = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL;

export const apiClient = axios.create({
  baseURL: url,
  withCredentials: true,
});
