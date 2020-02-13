import React, { Component } from 'react'

const FamilyContext = React.createContext({
  users: [],
  recipes: [],
  isUserLoggedIn: '',
  addRecipe: () => {},
  deleteRecipe: () => {},
  updateRecipe: () => {},
  handleDeleteRecipeClick: () => {},
  addUser: () => {},
  deleteUser: () => {},
  editUser: () => {},
  handleDeleteUserClick: () => {},
  loggedIn: () => {},
  loggedOut: () => {},
  clearError: () => {},
  serError: () => {},
})

export default FamilyContext
