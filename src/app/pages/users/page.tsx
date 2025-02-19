import {fetchUsersApi} from "@/app/services/users.service";
import UsersComponent from "@/app/components/users/UsersComponent";
import PaginationComponent from "@/app/components/pagination/PaginationComponent";
import {IUsers} from "@/app/models/users/IUsers";
import UsersSearch from "@/app/components/users/UsersSearch";

interface UsersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function UsersPage({searchParams}: UsersPageProps) {
    console.log("UsersPage");

    const resolvedSearchParams = (await searchParams) ?? {};
    const page = Number(resolvedSearchParams?.page) || 1;

    const limit = 30;
    const skip = (page - 1) * limit;
    const endpoint = `?limit=${limit}&skip=${skip}`;


    const {users, total}: IUsers = await fetchUsersApi(endpoint);

    return (
        <>
            <PaginationComponent page={page} total={total}/>
            <UsersSearch/>
            <UsersComponent users={users}/>
        </>
    );
}
