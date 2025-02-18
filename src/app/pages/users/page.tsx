import {fetchUsersApi} from "@/app/services/users.service";
import {IUsers} from "@/app/models/users/IUsers";

export default async function UsersPage() {
    const {users}: IUsers = await fetchUsersApi();

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