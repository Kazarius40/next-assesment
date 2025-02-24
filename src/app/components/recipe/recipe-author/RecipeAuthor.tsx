'use client';
import {useEffect, useState} from "react";
import {IUser} from "@/app/models/user/IUser";
import {fetchUsersApiByID} from "@/app/services/users.service";
import Link from "next/link";
import '../recipe-details/RecipesDetails.css'

interface IRecipeAuthorProps {
    authorId: number;
}


export function RecipeAuthor({authorId}: IRecipeAuthorProps) {
    const [author, setAuthor] = useState<IUser | null>(null);


    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await fetchUsersApiByID(`/${authorId}`);
            setAuthor(data);
        };

        fetchAuthor().catch(console.error);
    }, [authorId]);

    if (!author) return null;

    return (
        <p>
            Автор: <Link href={'/pages/user/' + author.id}>{author.firstName} {author.lastName}</Link>
        </p>
    )
}