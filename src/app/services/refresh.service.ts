import axios from "axios";
import {cookies} from "next/headers";
import axiosInstance from "@/app/services/api.service";

const axiosInstanceRefresh = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {}
});

axiosInstance.interceptors.request.use(async (endpoint) => {
    const cookieStore = await cookies();
    const userWithTokensCookie = cookieStore.get('userWithTokens')?.value;

    const refreshToken: string | undefined = userWithTokensCookie ? JSON.parse(userWithTokensCookie).accessToken : undefined;
    if (refreshToken) {
        endpoint.headers['Authorization'] = 'Bearer ' + refreshToken;
    }
    return endpoint;
});


export default axiosInstanceRefresh;