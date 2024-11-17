import React from 'react';
import useRecipeStore from '../recipeStore';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId));

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      {/* Render EditRecipeForm and DeleteRecipeButton here */}
    </div>
  );
};

export default RecipeDetails;
