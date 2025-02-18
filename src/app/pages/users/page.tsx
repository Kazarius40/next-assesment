import {fetchUsersApi} from "@/app/services/users.service";

export default async function UsersPage() {
    const {users} = await fetchUsersApi();

    return (
        <div>
            <h1>Список користувачів</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};