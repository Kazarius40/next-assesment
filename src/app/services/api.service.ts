import axios from "axios";
import {getCookie, setCookie} from "cookies-next";


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {}
});

let isRefreshing = false;

axiosInstance.interceptors.request.use(
    async (requestObject) => {
        let accessToken = getCookie("accessToken");
        if (!accessToken) {
            console.error("Access token is missing in cookies.");
        }
        const refreshToken = getCookie("refreshToken");


        if (!accessToken && !isRefreshing) {
            isRefreshing = true;

            // const refreshToken = getCookie("refreshToken");
            const response = await axiosInstance.post("auth/refresh", {refreshToken});

            accessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            setCookie("accessToken", accessToken);
            setCookie("refreshToken", newRefreshToken);

            isRefreshing = false;
        }

        if (accessToken && requestObject.method?.toUpperCase() === 'GET') {
            requestObject.headers["Authorization"] = "Bearer " + accessToken;
        }

        return requestObject;
    });

export default axiosInstance;