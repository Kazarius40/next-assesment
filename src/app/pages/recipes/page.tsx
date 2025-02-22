import {refreshToken} from "@/app/services/auth.service";
import RecipesContainer from "@/app/components/recipes/RecipesContainer";
import SearchInput from "@/app/components/search-input/SearchInput";
import PaginationComponentRecipes from "@/app/components/recipes/pagination/PaginationComponentRecipes";
import {fetchUsersApi} from "@/app/services/users.service";

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
        const response = await fetchUsersApi(`/auth/recipes?limit=1`);
        total = response.total;
    } catch {
        await refreshToken();
        const response = await fetchUsersApi(`/auth/recipes?limit=1`);
        total = response.total;
    }

    return (
        <>
            <PaginationComponentRecipes page={page} total={total}/>
            <SearchInput/>
            <RecipesContainer page={page} limit={limit} skip={skip} />
        </>
    );
};