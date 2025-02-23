'use server';
import {cookies} from "next/headers";
import {ITokensPair} from "@/app/models/tokens-pair/ITokensPair";
import {IUserWithToken} from "@/app/models/user-with-token/IUserWithToken";
import axiosInstanceRefresh from "@/app/services/refresh.service";


export async function loginWithToken(data: FormData): Promise<void> {
    const formData = {username: data.get('username'), password: data.get('password')};


    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const {userWithTokens} = await response.json();

    const cookieStore = await cookies();
    cookieStore.set('userWithTokens', JSON.stringify(userWithTokens));
}


export async function refreshToken(): Promise<void> {
    const cookieStore = await cookies();
    const userWithTokensCookie = cookieStore.get('userWithTokens')?.value;

    if (userWithTokensCookie) {
        const userWithTokens: IUserWithToken = JSON.parse(userWithTokensCookie);
        const {refreshToken} = userWithTokens;

        const {data: newTokens} = await axiosInstanceRefresh.post<ITokensPair>('/auth/refresh', {refreshToken});

        const updatedUserWithTokens = {
            ...userWithTokens,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
        };

        cookieStore.set('userWithTokens', JSON.stringify(updatedUserWithTokens));
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("userWithTokens", "");
}