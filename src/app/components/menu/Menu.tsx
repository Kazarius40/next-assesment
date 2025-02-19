"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {logout} from "@/app/services/auth.service";

type MenuProps = {
    user: {
        username: string;
        image: string;
    };
};

const Menu = ({ user }: MenuProps) => {
    const router = useRouter();

    const logoutHandler = async () => {
        await logout();
        router.push("/");
    };

    return (
        <nav>
            <ul>
                {user && (
                    <>
                        <img src={user.image} alt={user.username} />
                        <span>{user.username}</span>
                    </>
                )}
                <li><Link href="/pages/users">Користувачі</Link></li>
                <li><Link href="/pages/recipes">Рецепти</Link></li>
                <button onClick={logoutHandler}>Logout</button>
            </ul>
        </nav>
    );
};

export default Menu;