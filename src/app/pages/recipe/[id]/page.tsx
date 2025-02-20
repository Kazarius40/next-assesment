"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {IUser} from "@/app/models/user/IUser";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import {fetchRecipesApiByID} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";
import RecipeDetails from "@/app/components/recipe/recipe-details/RecipeDetails";
import {RecipeAuthor} from "@/app/components/recipe/recipe-author/RecipeAuthor";

export default function RecipeProfile() {
    const {id} = useParams();
    const [user, setUser] = useState<IUser | null>(null);
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
            <RecipeDetails recipe={recipe}/>
            <RecipeAuthor authorId={recipe.userId}/>
        </>
    )
}