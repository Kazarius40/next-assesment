"use client";
import React, {FC, useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {fetchUsersApi} from "@/app/services/users.service";
import UsersComponent from "./UsersComponent";
import {IUser} from "@/app/models/user/IUser";
import {refreshToken} from "@/app/services/auth.service";

interface UsersContainerProps {
    page: number;
    limit: number;
    skip: number;
}

const UsersContainer: FC<UsersContainerProps> = ({page, limit, skip}) => {


    const [users, setUsers] = useState<IUser[]>([]);
    const searchEndpoint = getCookie("searchEndpoint");
    console.log("searchEndpoint:", searchEndpoint);

    useEffect(() => {
        const fetchUsers = async () => {


            const baseEndpoint = `?limit=${limit}&skip=${skip}`;
            const finalEndpoint = searchEndpoint ? searchEndpoint + "&" + baseEndpoint : baseEndpoint;

            try {
                setUsers((await fetchUsersApi(finalEndpoint)).users);
            } catch {
                await refreshToken();
                setUsers((await fetchUsersApi(finalEndpoint)).users);
            }
        };
        fetchUsers().catch(console.error);
    }, [searchEndpoint, page, limit, skip]);

    return <UsersComponent users={users}/>;
};

export default UsersContainer;
