import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {IUserWithToken} from "@/app/models/user-with-token/IUserWithToken";
import axiosInstance from "@/app/services/api.service";
import {ITokensPair} from "@/app/models/tokens-pair/ITokensPair";


export async function POST(): Promise<NextResponse> {
    const cookieStore = await cookies();
    const userWithTokensCookie = cookieStore.get('userWithTokens')?.value;

    if (!userWithTokensCookie) {
        return new NextResponse('No refresh token found', { status: 400 });
    }

    const storedUserWithTokens: IUserWithToken = JSON.parse(userWithTokensCookie);
    const { refreshToken } = storedUserWithTokens;

    try {
        const { data: newTokens }: { data: ITokensPair } = await axiosInstance.post('/auth/refresh', {
            refreshToken,
            expiresInMins: 1
        });

        cookieStore.set('userWithTokens', JSON.stringify({
            ...storedUserWithTokens,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
        }), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return NextResponse.json(newTokens);
    } catch {
        return new NextResponse('Failed to refresh token', { status: 500 });
    }
}
