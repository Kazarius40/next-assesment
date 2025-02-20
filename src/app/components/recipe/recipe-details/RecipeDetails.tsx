import Link from "next/link";
import {IRecipe} from "@/app/models/recipes/IRecipe";

type RecipeDetails = {
    recipe: IRecipe;
}

const RecipeDetails = ({recipe}: RecipeDetails) => {
    return (
        <div>
            <h2>{recipe.name}</h2>
            <ul>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
            <div>
                <h4>Теги:</h4>
                {recipe.tags.map((tag, index) => (
                    <div key={index}>
                        <Link href={'/pages/recipe/tag/' + tag}>{tag}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecipeDetails;