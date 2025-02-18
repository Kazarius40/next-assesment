'use server';
import {cookies} from "next/headers";
import axiosInstance from "@/app/services/api.service";

export async function loginWithToken(data: FormData): Promise<void> {
    const formData = {
        username: data.get('username'),
        password: data.get('password')
    };
    const response = await axiosInstance.post('/auth/login', formData);
    const {accessToken, refreshToken} = response.data;
    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {httpOnly: true, secure: true, sameSite: 'strict'});
    cookieStore.set('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'strict'});
}