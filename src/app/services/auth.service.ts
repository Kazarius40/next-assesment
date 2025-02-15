import axiosInstance from "@/app/services/api.service";
import {setCookie} from "cookies-next";

const loginWithToken = async (data: FormData) => {
    const loginData = {
        username: data.get("username") as string,
        password: data.get("password") as string
    };
    const response = await axiosInstance.post("/auth/login", loginData);
    const {accessToken, refreshToken} = response.data;

    await setCookie('accessToken', accessToken);
    await setCookie('refreshToken', refreshToken);

    return { success: true };
}

export default loginWithToken;