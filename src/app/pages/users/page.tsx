import {fetchUsersApi} from "@/app/services/users.service";

const UsersPage = async () => {

    const data = await fetchUsersApi();
    const users = data.users;

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

export default UsersPage;