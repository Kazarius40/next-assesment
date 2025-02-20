'use client';
import {FC, useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {fetchRecipesApi} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import RecipesComponent from "@/app/components/recipes/RecipesComponent";

interface UsersContainerProps {
    page: number;
    limit: number;
    skip: number;
}

const RecipesContainer: FC<UsersContainerProps> = ({page, limit, skip}) => {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const searchEndpoint = getCookie("searchEndpoint");

    useEffect(() => {
        const fetchRecipes = async () => {


            const baseEndpoint = `?limit=${limit}&skip=${skip}`;
            const finalEndpoint = searchEndpoint ? searchEndpoint + "&" + baseEndpoint : baseEndpoint;

            try {
                setRecipes((await fetchRecipesApi(finalEndpoint)).recipes);
            } catch {
                await refreshToken();
                setRecipes((await fetchRecipesApi(finalEndpoint)).recipes);
            }
        };
        fetchRecipes().catch(console.error);
    }, [searchEndpoint, page, limit, skip]);

    return <RecipesComponent recipes={recipes}/>
}

export default RecipesContainer;