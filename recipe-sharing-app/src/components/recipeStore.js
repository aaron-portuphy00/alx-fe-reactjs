import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (id) => set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)),
    searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  get filteredRecipes() {
    return this.recipes.filter(recipe => recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  },
  })),
}));
