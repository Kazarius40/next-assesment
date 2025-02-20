"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import {fetchRecipesApiByID} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";
import {RecipeAuthor} from "@/app/components/recipe/recipe-author/RecipeAuthor";
import RecipesDetails from "@/app/components/recipe/recipe-details/RecipesDetails";

export default function RecipeProfile() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);


    useEffect(() => {
        const fetchRecipe = async () => {
            let dataRecipe;
            try {
                dataRecipe = await fetchRecipesApiByID("/" + id);
            } catch {
                await refreshToken();
                dataRecipe = await fetchRecipesApiByID("/" + id);
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