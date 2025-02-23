import axiosInstance from "@/app/services/api.service";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";


export async function POST(req: NextRequest): Promise<NextResponse> {


    const formData = await req.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const {data: userWithTokens} = await axiosInstance.post('/auth/login', {
        username,
        password,
        expiresInMins: 1
    });

    const {accessToken, refreshToken, ...userData} = userWithTokens;
    const cookieStore = await cookies();

    cookieStore.set('authTokens', JSON.stringify({accessToken, refreshToken}), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    cookieStore.set("userData", JSON.stringify(userData));

    return NextResponse.json(userData);
}
