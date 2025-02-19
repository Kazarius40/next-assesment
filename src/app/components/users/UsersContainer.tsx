"use client";
import React, {FC, useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {fetchUsersApi} from "@/app/services/users.service";
import UsersComponent from "./UsersComponent";
import {IUser} from "@/app/models/user/IUser";

interface UsersContainerProps {
    page: number;
    limit: number;
    skip: number;
}

const UsersContainer: FC<UsersContainerProps> = ({page, limit, skip}) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const searchEndpoint = getCookie("searchEndpoint");

    useEffect(() => {
        const fetchUsers = async () => {
            const baseEndpoint = `?limit=${limit}&skip=${skip}`;
            const finalEndpoint = searchEndpoint ? searchEndpoint + "&" + baseEndpoint : baseEndpoint;

            const {users} = await fetchUsersApi(finalEndpoint);
            setUsers(users);
        };

        fetchUsers().catch(console.error);
    }, [searchEndpoint, page, limit, skip]);

    return <UsersComponent users={users}/>;
};

export default UsersContainer;
