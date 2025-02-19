'use client';
import React, {useState} from "react";
import {setCookie} from "cookies-next";

const UsersSearch = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEndpoint = `/search?q=${event.target.value}`;
        setCookie('searchEndpoint', newEndpoint);
        setSearch(event.target.value);
    };


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