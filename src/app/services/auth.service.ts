'use server';
import {cookies} from "next/headers";


export async function loginWithToken(data: FormData): Promise<void> {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const userWithTokens = await response.json();
    const cookieStore = await cookies();
    cookieStore.set('userWithTokens', JSON.stringify(userWithTokens), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
}



export async function refreshToken(): Promise<void> {
    const response = await fetch('http://localhost:3000/api/auth/refresh', {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Token refresh failed');
    }

    const newTokens = await response.json();
    const cookieStore = await cookies();
    const userWithTokensCookie = cookieStore.get('userWithTokens')?.value;

    if (userWithTokensCookie) {
        const storedUserWithTokens = JSON.parse(userWithTokensCookie);
        cookieStore.set('userWithTokens', JSON.stringify({
            ...storedUserWithTokens,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken
        }), {httpOnly: true, secure: true, sameSite: 'strict'});
    }
}




export async function logout(): Promise<void> {
    await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
    });

    const cookieStore = await cookies();
    cookieStore.set("userWithTokens", "", {httpOnly: true, secure: true, sameSite: "strict"});
}