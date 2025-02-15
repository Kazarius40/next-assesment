import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "cookies-next";

export async function middleware(request: NextRequest) {
    const accessToken = getCookie('accessToken', {req: request});

    if (request.method === 'GET') {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('Authorization', "Bearer " + accessToken);

        return NextResponse.next({ request: { headers: requestHeaders } });
    }
}

export const config = {matcher: '/api/:path*',}