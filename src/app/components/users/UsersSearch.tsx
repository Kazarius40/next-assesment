'use client';
import React, {useEffect, useState} from "react";
import {deleteCookie, setCookie} from "cookies-next";
import {usePathname} from "next/navigation";

const UsersSearch = () => {
    const [search, setSearch] = useState("");
    const pathname = usePathname();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEndpoint = `/search?q=${event.target.value}`;
        setCookie('searchEndpoint', newEndpoint);
        setSearch(event.target.value);
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