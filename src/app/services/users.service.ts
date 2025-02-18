import {IUsers} from "@/app/models/users/IUsers";
import axiosInstance from "@/app/services/api.service";

export async function fetchUsersApi(): Promise<IUsers> {
    const response = await axiosInstance.get('/auth/users');
    return response.data;
}