import React from 'react';
import { useRecipeStore } from '../recipeStore'; // Adjust the path based on your project structure
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const { deleteRecipe } = useRecipeStore((state) => ({
    deleteRecipe: state.deleteRecipe,
  }));

  const navigate = useNavigate();

  const handleDelete = () => {
    // Call the deleteRecipe action from Zustand store
    deleteRecipe(recipeId);
    // Navigate back to the main recipe list after deletion
    navigate('/');
  };

  return (
    <button onClick={handleDelete} style={{ color: 'red' }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
