'use client';
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {IUser} from "@/app/models/user/IUser";
import {fetchUsersApiByID} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";

export default function UserProfile() {
    const {id} = useParams();
    const [user, setUser] = useState<IUser | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            let data;
            try {
                data = await fetchUsersApiByID("/" + id);
            } catch {
                await refreshToken();
                data = await fetchUsersApiByID("/" + id);
            }

            setUser(data);
        };
        fetchUser().catch(console.error);
    }, [id]);

    if (!user) {
        return <p>Завантаження...</p>;
    }

    return (
        <div>
            <h1>Профіль користувача</h1>
            <p><strong>Імя:</strong> {user.username}</p>
            <p><strong>Фамілія:</strong> {user.lastName}</p>
            <p><strong>Електронна пошта:</strong> {user.email}</p>
            <p><strong>Вік:</strong> {user.age}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
            <p><strong>Роль:</strong> {user.role}</p>
            <p><strong>Освіта:</strong> {user.university}</p>
        </div>
    );
}
