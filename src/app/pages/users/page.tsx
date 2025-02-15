"use client";
import {fetchUsersApi} from "@/app/services/users.service";
import {useEffect, useState} from "react";
import {IUser} from "@/app/models/user/IUser";

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsersApi();
            const users = data.users;
            setUsers(users);
        };

        getUsers();
    }, []);

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