import React from 'react'

export default React.createContext({
  users: [],
  recipes: [],
  addRecipe: () => {},
  deleteRecipe: () => {},
  editRecipe: () => {},
  handleDeleteRecipeClick: () => {},
  deleteUser: () => {},
  handleDeleteUserClick: () => {},
})