'use server';
import {IUsers} from "@/app/models/users/IUsers";
import axiosInstance from "@/app/services/api.service";
import {IUser} from "@/app/models/user/IUser";

export async function fetchUsersApi(endpoint: string): Promise<IUsers> {
    const {data} = await axiosInstance.get(`/auth/users${endpoint}`);
    return data;
}

export async function fetchUsersApiByID(endpoint: string): Promise<IUser> {
    const {data} = await axiosInstance.get(`/auth/users${endpoint}`);
    console.log(data)
    return data;
}