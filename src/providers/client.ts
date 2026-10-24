import { authenticationService } from "@/services/authentication";
import axios from "axios";

export function createClient(url: string) {
  return axios.create({
    baseURL: url,
  });
}

export function createAuthenticatedClient(url: string) {
  const client = createClient(url);

  client.interceptors.request.use(function (config) {
    const token = authenticationService.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
}
