import axios from "axios";
import { config } from "../../config/env";
const { AUTH_API_BASE_URL, AUTH_API_USERNAME, AUTH_API_PASSWORD } = config;

export const AuthAPI = axios.create({
  baseURL: AUTH_API_BASE_URL,
  auth: { username: AUTH_API_USERNAME, password: AUTH_API_PASSWORD },
  headers: { "Content-Type": "application/json" },
});