import {IUser} from "@/app/models/user/IUser";

interface IUsersProps {
    users: IUser[];
}

export default function UsersComponent({users}: IUsersProps) {
    console.log("Users Component");
    return(
        <div>
            <h1>Список користувачів</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                            <strong>Name:</strong> {user.username}
                        </p>
                        <p>
                            <strong>E-Mail:</strong> {user.email}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};