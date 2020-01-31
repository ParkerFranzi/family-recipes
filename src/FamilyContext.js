import React, { Component } from 'react'

const FamilyContext = React.createContext({
  users: [],
  recipes: [],
  addRecipe: () => {},
  deleteRecipe: () => {},
  editRecipe: () => {},
  handleDeleteRecipeClick: () => {},
  addUser: () => {},
  deleteUser: () => {},
  editUser: () => {},
  handleDeleteUserClick: () => {},
})

export default FamilyContext
