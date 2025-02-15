import axios from "axios";
import {getCookie} from "cookies-next";


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {}
});

axiosInstance.interceptors.request.use((requestObject) => {
    const accessToken = getCookie('accessToken');

    if (accessToken && requestObject.method?.toUpperCase() === 'GET') {
        requestObject.headers.Authorization = 'Bearer ' + accessToken;
    }

    return requestObject;
});

export default axiosInstance;