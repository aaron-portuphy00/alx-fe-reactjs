import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({}); // State for validation errors

  const validate = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    if (!ingredients.trim()) {
      errors.ingredients = 'Ingredients are required';
    } else if (ingredients.split(',').length < 2) {
      errors.ingredients = 'Please list at least two ingredients, separated by commas';
    }
    if (!steps.trim()) {
      errors.steps = 'Preparation steps are required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Validation passes if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log({
        title,
        ingredients: ingredients.split(',').map((item) => item.trim()),
        steps,
      });
      alert('Recipe submitted successfully!');
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4">
      <div>
        <label className="block font-medium mb-1">Recipe Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border p-2 w-full rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Ingredients (comma-separated)</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className={`border p-2 w-full rounded ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
        ></textarea>
        {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Preparation Steps</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className={`border p-2 w-full rounded ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
        ></textarea>
        {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
