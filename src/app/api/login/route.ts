import axiosInstance from "@/app/services/api.service";
import {cookies} from "next/headers";

export async function POST(request: Request) {
    const {username, password} = await request.json();

    const {data: userWithTokens} = await axiosInstance.post('/auth/login', {username, password});

    const cookieStore = await cookies();
    cookieStore.set('userWithTokens', JSON.stringify(userWithTokens));
    return new Response(JSON.stringify({ userWithTokens }));
}