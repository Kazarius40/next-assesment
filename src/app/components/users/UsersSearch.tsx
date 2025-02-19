'use client';
import React, {useState} from "react";

const UsersSearch = () => {
    const [search, setSearch] = useState("");
    const [endpoint, setEndpoint] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setEndpoint(`/search?q=${event.target.value}`);

    };
    console.log(endpoint);


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