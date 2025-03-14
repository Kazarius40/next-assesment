'use client';
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {deleteCookie, setCookie} from "cookies-next";
import './SearchInput.css'

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newEndpoint = `/search?q=${newValue}`;

        setCookie('searchEndpoint', newEndpoint);
        setSearch(newValue);
        const targetPage = pathname.startsWith('/pages/recipes') ? '/pages/recipes' : '/pages/users';
        router.push(targetPage);
    };

    useEffect(() => {
        deleteCookie("searchEndpoint");
        setSearch("");
    }, [pathname]);

    return (
        <div className="search-container">
            <input
                type="text"
                value={search}
                onChange={handleSearch}
            />

        </div>
    )
}

export default SearchInput;