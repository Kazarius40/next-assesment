import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {deleteCookie, setCookie} from "cookies-next";

const RecipesSearch = () => {
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
                placeholder="Введіть назву рецепта"
                value={search}
                onChange={handleSearch}
            />
        </>
    );
}

export default RecipesSearch;