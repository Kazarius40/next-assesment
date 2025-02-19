'use server';
import {IUsers} from "@/app/models/users/IUsers";
import axiosInstance from "@/app/services/api.service";

export async function fetchUsersApi(endpoint: string): Promise<IUsers> {
    console.log("fetchUsersApi");
    const {data} = await axiosInstance.get(`/auth/users${endpoint}`);
    console.log("пройшло");
    return data;
}