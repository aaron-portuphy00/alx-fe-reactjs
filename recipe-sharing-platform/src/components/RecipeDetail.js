import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((recipe) => recipe.id === parseInt(id));
        setRecipe(selectedRecipe);
      });
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{recipe.title}</h1>
      <p className="text-gray-700">{recipe.summary}</p>
      {/* Add more details here */}
    </div>
  );
};

export default RecipeDetail;
