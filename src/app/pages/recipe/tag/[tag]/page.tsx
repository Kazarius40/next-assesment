'use client';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import {fetchUsersApi} from "@/app/services/users.service";
import {IRecipes} from "@/app/models/recipes/IRecipes";
import Link from "next/link";

export default function TagProfile() {
    const params = useParams();
    const tag = params?.tag as string;
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const {total} = await fetchUsersApi("/auth/recipes?limit=1") as IRecipes;
            const {recipes} = await fetchUsersApi("/auth/recipes?limit=" + total) as IRecipes;
            const filteredRecipes = recipes.filter((recipe: IRecipe) => recipe.tags.includes(tag));
            setRecipes(filteredRecipes);
        }

        fetchRecipes().catch(console.error);
    }, [tag])

    return (
        <div>
            <h3>Рецепти з тегом: {tag}</h3>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link href={"/pages/recipe/" + recipe.id}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>

        </div>
    );
};