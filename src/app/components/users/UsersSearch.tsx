'use client';
import React, {useEffect, useState} from "react";
import {deleteCookie, setCookie} from "cookies-next";
import {usePathname, useRouter} from "next/navigation";

const UsersSearch = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newEndpoint = `/search?q=${newValue}`;

        setCookie('searchEndpoint', newEndpoint);
        setSearch(newValue);
        router.push('/pages/users');
    };

    useEffect(() => {
        deleteCookie("searchEndpoint");
        setSearch("");
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