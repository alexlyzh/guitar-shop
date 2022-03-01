import axios, { AxiosInstance } from 'axios';

const BASE_API_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;

const createApi = (): AxiosInstance => axios.create({
  baseURL: BASE_API_URL,
  timeout: REQUEST_TIMEOUT,
});

const api = createApi();

export { createApi, api, BASE_API_URL };
