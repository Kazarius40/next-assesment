import PaginationComponentUsers from "@/app/components/users/pagination/PaginationComponentUsers";
import UsersContainer from "@/app/components/users/UsersContainer";
import {fetchUsersApi} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";
import SearchInput from "@/app/components/search-input/SearchInput";

interface UsersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function UsersPage({searchParams}: UsersPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const page = Number(resolvedSearchParams?.page) || 1;

    const limit = 30;
    const skip = (page - 1) * limit;
    let total;

    try {
        const response = await fetchUsersApi(`?limit=1`);
        total = response.total;
    } catch {
        await refreshToken();
        const response = await fetchUsersApi(`?limit=1`);
        total = response.total;
    }


    return (
        <>
            <PaginationComponentUsers page={page} total={total}/>
            <SearchInput/>
            <UsersContainer page={page} limit={limit} skip={skip} />
        </>
    );
}
