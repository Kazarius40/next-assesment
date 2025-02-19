'use client';
import React, {useEffect, useState} from "react";
import {deleteCookie, setCookie} from "cookies-next";
import {usePathname, useRouter} from "next/navigation";

const UsersSearch = () => {
    const [search, setSearch] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEndpoint = `/search?q=${event.target.value}`;
        setCookie('searchEndpoint', newEndpoint);
        setSearch(event.target.value);
        router.push('/pages/users');
    };

    useEffect(() => {
        deleteCookie('searchEndpoint');
    }, [pathname]);


    return (
        <>
            <input
                type="text"
                placeholder="Введіть ім'я користувача"
                value={search}
                onChange={handleSearch}
            />
        </>
    );
};

export default UsersSearch;