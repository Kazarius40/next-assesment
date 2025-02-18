'use server';
import {cookies} from "next/headers";
import axiosInstance from "@/app/services/api.service";
import {ITokensPair} from "@/app/models/tokens-pair/ITokensPair";

async function saveTokensToCookies(response: { data: ITokensPair }): Promise<void> {
    const {accessToken, refreshToken} = response.data;
    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {httpOnly: true, secure: true, sameSite: 'strict'});
    cookieStore.set('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'strict'});
}

export async function loginWithToken(data: FormData): Promise<void> {
    const formData = {username: data.get('username'), password: data.get('password')};
    const response = await axiosInstance.post('/auth/login', formData);
    await saveTokensToCookies(response);
}

export async function refreshToken(): Promise<void> {
    const cookieStore = await cookies();
    const refreshToken: string | undefined = cookieStore.get('refreshToken')?.value;
    const response = await axiosInstance.post<ITokensPair>('/auth/refresh', {refreshToken: refreshToken});
    await saveTokensToCookies(response);
}