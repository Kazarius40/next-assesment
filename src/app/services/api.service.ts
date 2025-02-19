'use server';

import axios from "axios";
import {cookies} from "next/headers";


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {}
});

axiosInstance.interceptors.request.use(async (endpoint) => {
    const cookieStore = await cookies();
    const userWithTokensCookie = cookieStore.get('userWithTokens')?.value;

    const accessToken: string | undefined = userWithTokensCookie ? JSON.parse(userWithTokensCookie).accessToken : undefined;
    if (accessToken) {
        endpoint.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return endpoint;
});


export default axiosInstance;