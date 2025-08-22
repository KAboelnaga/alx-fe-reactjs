import {useState, useEffect} from "react";
import data from '../data.json';
import { Link } from 'react-router-dom';
function HomePage() {
    const [recipes, setRecipes] = useState([])
    useEffect(( ) => {
        setRecipes(data);
    }, []
    )
    return (
        <div>
        <h2>Recipes List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => (
                <Link key={recipe.id} className="border p-4 rounded shadow" to={`/recipe/${recipe.id}`}>
                    <img src={recipe.image} alt={recipe.title} className="w-full"/>
                    <h2 className="mt-2 hover:text-blue-500">{recipe.title}</h2>
                    <p className="mt-2">{recipe.summary}</p>
                </Link>
            ))}
        </div>
        </div>
    )
}
export default HomePage;