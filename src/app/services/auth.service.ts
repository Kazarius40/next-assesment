import axiosInstance from "@/app/services/api.service";
import {setCookie} from "cookies-next";

const loginWithToken = async (data: FormData) => {
    const loginData = {
        username: data.get("username") as string,
        password: data.get("password") as string
    };
    const {data: userWithTokens} = await axiosInstance.post("auth/login", loginData);


    setCookie("accessToken", userWithTokens.accessToken);
    setCookie("refreshToken", userWithTokens.refreshToken);
}

export default loginWithToken;