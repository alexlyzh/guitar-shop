import axios, {AxiosInstance} from 'axios';

const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;

const createApi = (): AxiosInstance => axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

export {createApi};
