import {fetchRecipesApi} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";
import PaginationComponent from "@/app/components/pagination/PaginationComponent";
import RecipesSearch from "@/app/components/recipes/RecipesSearch";
import RecipesContainer from "@/app/components/recipes/RecipesContainer";

interface UsersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function RecipesPage({searchParams}: UsersPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const page = Number(resolvedSearchParams?.page) || 1;

    const limit = 30;
    const skip = (page - 1) * limit;
    let total;

    try {
        const response = await fetchRecipesApi(`?limit=1`);
        total = response.total;
    } catch {
        await refreshToken();
        const response = await fetchRecipesApi(`?limit=1`);
        total = response.total;
    }

    return (
        <>
            <PaginationComponent page={page} total={total}/>
            <RecipesSearch/>
            <RecipesContainer page={page} limit={limit} skip={skip} />
        </>
    );
};