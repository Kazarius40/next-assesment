"use client";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Ласкаво просимо на головну сторінку!</h1>
            <p>Для подальшої роботи з сайтом потрібно залогінитися.</p>
            <Link href="/pages/authorization">
                <button>Перейти до сторінки входу</button>
            </Link>
        </div>
    );
}
