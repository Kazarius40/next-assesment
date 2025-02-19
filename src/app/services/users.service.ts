import {IUsers} from "@/app/models/users/IUsers";
import axiosInstance from "@/app/services/api.service";

export async function fetchUsersApi(page: number): Promise<IUsers> {
    const limit = 30;
    const skip = (page - 1) * limit;
    console.log("fetchUsersApi");
    const {data} = await axiosInstance.get(`/auth/users?limit=${limit}&skip=${skip}`);
    return data;
}