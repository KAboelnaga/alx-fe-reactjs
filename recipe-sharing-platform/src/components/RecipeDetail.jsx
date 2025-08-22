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
  </div>

  )
}
export default RecipeDetail;