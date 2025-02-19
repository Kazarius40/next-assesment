"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { fetchUsersApi } from "@/app/services/users.service";
import UsersComponent from "./UsersComponent";
import {IUser} from "@/app/models/user/IUser";

interface UsersContainerProps {
    page: number;
    limit: number;
    skip: number;
}

const UsersContainer: React.FC<UsersContainerProps> = ({ page, limit, skip }) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [searchEndpoint, setSearchEndpoint] = useState(getCookie("searchEndpoint") || "");

    useEffect(() => {
        const fetchUsers = async () => {
            const baseEndpoint = `?limit=${limit}&skip=${skip}`;
            const finalEndpoint = searchEndpoint ? searchEndpoint + "&" + baseEndpoint : baseEndpoint;
            console.log(finalEndpoint);

            const { users} = await fetchUsersApi(finalEndpoint);
            setUsers(users);

        };

        fetchUsers().catch(console.error);
    }, [searchEndpoint, page, limit, skip]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newSearchEndpoint = getCookie("searchEndpoint") || "";
            if (newSearchEndpoint !== searchEndpoint) {
                setSearchEndpoint(newSearchEndpoint);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [searchEndpoint]);

    return <UsersComponent users={users} />;
};

export default UsersContainer;
