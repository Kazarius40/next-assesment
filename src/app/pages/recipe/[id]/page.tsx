"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import {refreshToken} from "@/app/services/auth.service";
import {RecipeAuthor} from "@/app/components/recipe/recipe-author/RecipeAuthor";
import RecipesDetails from "@/app/components/recipe/recipe-details/RecipesDetails";
import {fetchUsersApi} from "@/app/services/users.service";

export default function RecipeProfile() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);


    useEffect(() => {
        const fetchRecipe = async () => {
            let dataRecipe;
            try {
                dataRecipe = await fetchUsersApi("/auth/recipes" + id);
            } catch {
                await refreshToken();
                dataRecipe = await fetchUsersApi("/auth/recipes" + id);
            }

            setRecipe(dataRecipe);
        }
        fetchRecipe().catch(console.error);
    }, [id])

    if (!recipe) {
        return <p>Завантаження...</p>;
    }

    return (
        <>
            <RecipesDetails recipe={recipe}/>
            <RecipeAuthor authorId={recipe.userId}/>
        </>
    )
}