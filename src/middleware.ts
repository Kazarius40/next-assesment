import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "cookies-next";

export async function middleware(request: NextRequest) {
    const accessToken = getCookie('accessToken', {req: request});
    const requestHeaders = new Headers(request.headers);

    if (accessToken) {
        requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });


}

export const config = {
    matcher: '/:path*',
}