import {NextRequest, NextResponse} from "next/server";
import {isDefaultCookiesExisted, setDefaultCookies} from "@/app/services/utils";

const middleware = async (request: NextRequest) => {
    const response = NextResponse.next();

    const isAllDefaultCookiesAvailable = await isDefaultCookiesExisted();

    if (!isAllDefaultCookiesAvailable) {
        await setDefaultCookies({ req: request, res: response });
    }

    return response;
};

export const config = {
    matcher: '/:path*',
}

export default middleware;