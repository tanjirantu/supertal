import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { getToken } from '../libs/authClient';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Accept: 'application/json' },
});
instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = getToken();
        config.headers = { Authorization: token ? `Bearer ${token}` : '' };
        return config;
    },
    (error) => Promise.reject(error)
);
export default instance;
