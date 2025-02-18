import axios from "axios";
import {cookies} from "next/headers";


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {}
});

axiosInstance.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const accessToken: string | undefined = cookieStore.get('accessToken')?.value;
    if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
});


export default axiosInstance;