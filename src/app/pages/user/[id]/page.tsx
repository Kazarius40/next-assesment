'use client';
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {IUser} from "@/app/models/user/IUser";
import {fetchRecipesApi, fetchUsersApiByID} from "@/app/services/users.service";
import {refreshToken} from "@/app/services/auth.service";
import {IRecipe} from "@/app/models/recipes/IRecipe";
import Link from "next/link";
import {IRecipes} from "@/app/models/recipes/IRecipes";

export default function UserProfile() {
    const {id} = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);


    useEffect(() => {
        const fetchUser = async () => {
                let dataUser;
                try {
                    dataUser = await fetchUsersApiByID("/" + id);
                } catch {
                    await refreshToken();
                    dataUser = await fetchUsersApiByID("/" + id);
                }
            const {total} = await fetchRecipesApi("?limit=1") as IRecipes;
            const recipesResponse = await fetchRecipesApi("?limit=" + total) as IRecipes;
            const userRecipes = recipesResponse.recipes.filter(recipe => recipe.userId === Number(id));
            setRecipes(userRecipes);

            setUser(dataUser);
        };
        fetchUser().catch(console.error);
    }, [id]);

    if (!user) {
        return <p>Завантаження...</p>;
    }

    return (
        <div>
            <h1>Профіль користувача</h1>
            <p><strong>Імя:</strong> {user.username}</p>
            <p><strong>Фамілія:</strong> {user.lastName}</p>
            <p><strong>Електронна пошта:</strong> {user.email}</p>
            <p><strong>Вік:</strong> {user.age}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
            <p><strong>Роль:</strong> {user.role}</p>
            <p><strong>Освіта:</strong> {user.university}</p>
            <div className="user-recipes-container">
                <h3>Рецепти користувача:</h3>
                {recipes.length > 0 ? (
                    <ul>
                        {recipes.map(recipe => (
                            <li key={recipe.id}>
                                <Link href={'/pages/recipe/' + recipe.id}>{recipe.name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Рецепти у даного користувача відсутні</p>
                )}
            </div>
        </div>

    );
}