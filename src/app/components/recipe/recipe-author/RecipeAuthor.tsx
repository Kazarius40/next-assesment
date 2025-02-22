'use client';
import {useEffect, useState} from "react";
import {IUser} from "@/app/models/user/IUser";
import Link from "next/link";
import {fetchUsersApi} from "@/app/services/users.service";

interface IRecipeAuthorProps {
    authorId: number;
}


export function RecipeAuthor({authorId}: IRecipeAuthorProps) {
    const [author, setAuthor] = useState<IUser | null>(null);


    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await fetchUsersApi(`/auth/users/${authorId}`);
            setAuthor(data);
        };

        fetchAuthor().catch(console.error);
    }, [authorId]);

    if (!author) return null;

    return (
        <p className="recipe-author-container">
            Автор: <Link href={'/pages/user/' + author.id}>{author.firstName} {author.lastName}</Link>
        </p>
    )
}