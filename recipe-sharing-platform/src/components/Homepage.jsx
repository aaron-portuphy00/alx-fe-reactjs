import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="border rounded shadow-lg p-4 hover:shadow-xl transition">
          <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded" />
          <h3 className="text-xl font-semibold mt-2">{recipe.title}</h3>
          <p className="text-gray-600">{recipe.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
