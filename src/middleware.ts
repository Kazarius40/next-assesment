import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "cookies-next";

export async function middleware(req: NextRequest) {
    const accessToken = getCookie('accessToken', {req});

    if (accessToken && req.method?.toUpperCase() === 'GET') {
        const newReq = new Request(req);

        newReq.headers.set('Authorization', 'Bearer ' + accessToken);

        return NextResponse.next({});
    }
}

export const config = {matcher: '/api/:path*'}