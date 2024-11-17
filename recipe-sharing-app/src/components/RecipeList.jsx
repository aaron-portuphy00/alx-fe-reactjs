import React from 'react';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const { filteredRecipes } = useRecipeStore(state => ({
    filteredRecipes: state.filteredRecipes
  }));

  return (
    <div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
