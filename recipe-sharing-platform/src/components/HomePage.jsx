import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch the recipe data (mock or from a real API)
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
