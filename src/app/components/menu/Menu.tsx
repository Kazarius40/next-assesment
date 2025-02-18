'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

const Menu = () => {
    const pathname = usePathname();
    console.log(pathname);
    const hideMenu = pathname === "/";
    if (hideMenu) return null;
    return (
        <nav>
            <ul>
                <li><Link href="/pages/users">Користувачі</Link></li>
                <li><Link href="/pages/recipes">Рецепти</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;