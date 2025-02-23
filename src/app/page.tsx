import Link from "next/link";
import {cookies} from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const userWithTokensCookie = cookieStore.get('userWithTokens')?.value;

    const accessToken: string | undefined = userWithTokensCookie ? JSON.parse(userWithTokensCookie).accessToken : undefined;

    return (
        <>
            {!accessToken && <>
                <h1>Ласкаво просимо на головну сторінку!</h1>
                <p>Для подальшої роботи з сайтом потрібно залогінитися.</p>
                <Link href="/pages/authorization">
                    <button>Перейти до сторінки входу</button>
                </Link></>
            }
        </>
    );
}
