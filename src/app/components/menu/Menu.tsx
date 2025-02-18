'use client';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const Menu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pathname !== "/") {
            router.push("/");
        }
        setLoading(false);
    }, [pathname, router]);

    if (loading) return null;

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