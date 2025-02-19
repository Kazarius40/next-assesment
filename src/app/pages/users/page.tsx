import PaginationComponent from "@/app/components/pagination/PaginationComponent";
import UsersSearch from "@/app/components/users/UsersSearch";
import UsersContainer from "@/app/components/users/UsersContainer";
import {fetchUsersApi} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";

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
            <PaginationComponent page={page} total={total}/>
            <UsersSearch/>
            <UsersContainer page={page} limit={limit} skip={skip} />
        </>
    );
}
