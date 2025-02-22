import axiosInstance from "@/app/services/api.service";
import {IUser} from "@/app/models/user/IUser";
import {IUsers} from "@/app/models/users/IUsers";
import {NextRequest, NextResponse} from "next/server";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import {IRecipes} from "@/app/models/recipes/IRecipes";

type ApiResponse = IUser | IUsers | IRecipe | IRecipes;

export async function GET(req: NextRequest, context: { params: { slug: string[] } }) {
    const params = await (async () => context.params)();

    if (!params?.slug) {
        return new NextResponse("Missing slug", {status: 400});
    }

    const path = params.slug.join('/');


    const searchParams = req.nextUrl.search.toString();
    const endpoint = searchParams ? `/${path}${searchParams}` : `/${path}`;

    const {data} = await axiosInstance.get<ApiResponse>(endpoint);
    console.log("Це є data:", data);
    console.log("NextResponse:", NextResponse.json(data));

    return NextResponse.json(data);
}