import axiosInstance from "@/app/services/api.service";
import {IUsers} from "@/app/models/users/IUsers";

export const fetchUsersApi = async (): Promise<IUsers> => {
    const {data} = await axiosInstance.get<IUsers>("/auth/users");
    console.log(data);
    return data;
};