"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {logout} from "@/app/services/auth.service";
import  './Menu.css'

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
            <div className="menu-container">
                {user && (
                    <div className="user-info">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={user.image} alt={user.username} />
                        <span>{user.username}</span>
                    </div>
                )}
                <div className="nav-links">
                    <li><Link href="/pages/users">Користувачі</Link></li>
                    <li><Link href="/pages/recipes">Рецепти</Link></li>
                </div>
                <button className="logout-button" onClick={logoutHandler}>Logout</button>
            </div>
        </nav>
    );
};

export default Menu;