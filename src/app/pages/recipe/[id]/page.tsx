"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {IUser} from "@/app/models/user/IUser";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import {fetchRecipesApiByID} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";

export default function RecipeProfile() {
    const {id} = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe | null>(null);


    useEffect(() => {
        const fetchRecipe = async () => {
            let dataRecipe;
            try {
                dataRecipe = await fetchRecipesApiByID("/" + id);
            } catch {
                await refreshToken();
                dataRecipe = await fetchRecipesApiByID("/" + id);
            }

            setRecipes(dataRecipe);
        }
        fetchRecipe().catch(console.error);
    }, [id])
}