'use client';
import Link from "next/link";
import {getCookie} from "cookies-next";
import {useEffect, useState} from "react";
import {IUserWithToken} from "@/app/models/user-with-token/IUserWithToken";

export default function Home() {
    const [userData, setUserData] = useState<IUserWithToken | null>(null);

    useEffect(() => {
        const userDataCookie = getCookie("userData");
        if (userDataCookie) {
            setUserData(JSON.parse(userDataCookie as string));
        }
    }, []);


    return (
        <>
            {!userData && <>
                <h1>Ласкаво просимо на головну сторінку!</h1>
                <p>Для подальшої роботи з сайтом потрібно залогінитися.</p>
                <Link href="/pages/authorization">
                    <button>Перейти до сторінки входу</button>
                </Link></>
            }
        </>
    );
}
