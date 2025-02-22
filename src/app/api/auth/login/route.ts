import axiosInstance from "@/app/services/api.service";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";


export async function POST(req: NextRequest): Promise<NextResponse> {


    const formData = await req.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        const { data: userWithTokens } = await axiosInstance.post('/auth/login', {
            username,
            password,
            expiresInMins: 1
        });

        const cookieStore = await cookies();
        cookieStore.set('userWithTokens', JSON.stringify(userWithTokens), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return NextResponse.json(userWithTokens);
    } catch {
        return new NextResponse('Login failed', { status: 500 });
    }
}
