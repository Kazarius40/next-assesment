import axiosInstance from "@/app/services/api.service";

// type loginData = {
//     username: string;
//     password: string;
// }

const loginWithToken = async (data: FormData) => {
    const loginData = {
        username: data.get("username") as string,
        password: data.get("password") as string
    };
    const {data: userWithToken} = await axiosInstance.post("auth/login", loginData);
    console.log(userWithToken);
    return userWithToken;
}

export default loginWithToken;