'use server';
import {cookies} from "next/headers";
import axiosInstance from "@/app/services/api.service";
import {ITokensPair} from "@/app/models/tokens-pair/ITokensPair";
import {IUserWithToken} from "@/app/models/user-with-token/IUserWithToken";


export async function loginWithToken(data: FormData): Promise<void> {
    const formData = {username: data.get('username'), password: data.get('password')};
    const {data: userWithTokens} = await axiosInstance.post('/auth/login', formData);
    const cookieStore = await cookies();
    cookieStore.set('userWithTokens', JSON.stringify(userWithTokens), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60
    });
}

export async function refreshToken(): Promise<void> {
    const cookieStore = await cookies();
    const userWithTokensCookie = cookieStore.get('userWithTokens')?.value;

    if (userWithTokensCookie) {
        const storedUserWithTokens: IUserWithToken = JSON.parse(userWithTokensCookie);
        const {refreshToken} = storedUserWithTokens;

        const {data: newTokens} = await axiosInstance.post<ITokensPair>('/auth/refresh', {refreshToken});

        cookieStore.set('userWithTokens', JSON.stringify({
            ...storedUserWithTokens,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken
        }), {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60});
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("userWithTokens", "", {httpOnly: true, secure: true, sameSite: "strict", maxAge: 60});
}