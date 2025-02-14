import axiosInstance from "@/app/services/api.service";

const loginWithToken = async (data: FormData) => {
    const loginData = {
        username: data.get("username") as string,
        password: data.get("password") as string
    };
    const {data: userWithToken} = await axiosInstance.post("auth/login", loginData);
    return userWithToken;
}

export default loginWithToken;