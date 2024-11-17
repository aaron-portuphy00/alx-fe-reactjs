import React from 'react';
import useRecipeStore from '../recipeStore';

const RecommendationsList = () => {
  const { recommendations } = useRecipeStore(state => ({
    recommendations: state.recommendations
  }));

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.length > 0 ? (
        recommendations.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default RecommendationsList;
