'use client';
import React, {useEffect, useState} from "react";
import {deleteCookie, setCookie} from "cookies-next";
import {useRouter} from "next/navigation";

const UsersSearch = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newEndpoint = `/search?q=${newValue}`;

        setCookie('searchEndpoint', newEndpoint);
        setSearch(newValue);
        router.push('/pages/users');
    };

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).matches("a")) {
                deleteCookie("searchEndpoint");
                setSearch("");
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);


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