import {IRecipe} from "@/app/models/recipes/IRecipe";
import Link from "next/link";

interface IRecipesProps {
    recipes: IRecipe[];
}


const RecipesComponent = ({recipes}: IRecipesProps) => {
    return (
        <div>
            <h1>Список рецептів</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="recipe-item">
                        <p className="recipe-id">
                            <strong>ID:</strong> {recipe.id}
                        </p>
                        <p className="recipe-name">
                            <strong>Назва:</strong> {recipe.name}
                        </p>
                        <Link href={`/pages/recipe/${recipe.id}`}>Переглянути рецепти</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipesComponent;