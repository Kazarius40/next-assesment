import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {IUserWithToken} from "@/app/models/user-with-token/IUserWithToken";
import axiosInstance from "@/app/services/api.service";
import {ITokensPair} from "@/app/models/tokens-pair/ITokensPair";


export async function POST(): Promise<NextResponse> {
    const cookieStore = await cookies();
    const authTokensCookie = cookieStore.get('authTokens')?.value;

    if (!authTokensCookie) {
        return new NextResponse('No refresh token found', {status: 400});
    }

    const {refreshToken }: IUserWithToken = JSON.parse(authTokensCookie);

    const {data: newTokens}: { data: ITokensPair } = await axiosInstance.post('/auth/refresh', {
        refreshToken,
        expiresInMins: 1
    });

    cookieStore.set('authTokens', JSON.stringify(newTokens), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    return NextResponse.json(newTokens);
}
