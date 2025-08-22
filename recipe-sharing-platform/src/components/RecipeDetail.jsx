import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import recipeData from '../data.json';
function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        // Fetch recipe details using the id
        const foundRecipe = recipeData.find((r) => r.id === parseInt(id));
        setRecipe(foundRecipe);


    }, [id]);
  return (
  <div className='p-4'>
      <h2 className='text-2xl font-bold'>{recipe?.title}</h2>
      <p className='mt-2'>{recipe?.summary}</p>
      <img src={recipe?.image} alt={recipe?.title} className='w-full mt-4'/>
        <h3 className='mt-4 text-xl font-semibold'>Ingredients</h3>
        <ul className='list-disc pl-5 mt-2'>
            {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
        </ul>
        <h3 className='mt-4 text-xl font-semibold'>Instructions</h3>
        <p className='mt-2'>{recipe?.instructions}</p>
        <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            onClick={() => window.location.href = '/'}>
            Back to Recipes
        </button>
  </div>

  )
}
export default RecipeDetail;