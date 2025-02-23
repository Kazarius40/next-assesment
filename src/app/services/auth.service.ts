import {setCookie} from "cookies-next";

export async function loginWithToken(data: FormData): Promise<void> {
    await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: data,
    });
    window.location.reload();
}


export async function refreshToken(): Promise<void> {
    await fetch('http://localhost:3000/api/auth/refresh', {
        method: 'POST',
    });
}


export async function logout(): Promise<void> {
    await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
    });

    setCookie('userData', '', { maxAge: -1 });

    window.location.reload();
}