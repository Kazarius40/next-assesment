import {getCookies, setCookie} from "cookies-next";
import {NextRequest, NextResponse} from "next/server";

const defaultCookiesKeys = ['accessToken', 'refreshToken'];

export const isDefaultCookiesExisted = async () => {
    const allCookies = await getCookies();

    const existedCookies = allCookies && typeof allCookies === 'object' ? Object.keys(allCookies) : [];

    return defaultCookiesKeys.every(key => existedCookies.includes(key));
}

export const setDefaultCookies = async ({ req, res }: { req: NextRequest, res: NextResponse }) => {
    await setCookie('accessToken', '', {req, res});
    await setCookie('refreshToken', '', {req, res});
}