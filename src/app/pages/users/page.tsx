import {fetchUsersApi} from "@/app/services/users.service";
import UsersComponent from "@/app/components/users/UsersComponent";
import PaginationComponent from "@/app/components/pagination/PaginationComponent";
import {IUsers} from "@/app/models/users/IUsers";

interface UsersPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function UsersPage({searchParams}: UsersPageProps) {
    console.log("UsersPage");

    const resolvedSearchParams = (await searchParams) ?? {};
    const page = Number(resolvedSearchParams?.page) || 1;

    const {users, total}: IUsers = await fetchUsersApi(page);

    return (
        <>
            <PaginationComponent page={page} total={total}/>
            <UsersComponent users={users}/>
        </>
    );
}
