import React from 'react'

const FamilyContext = React.createContext({
  users: [],
  recipes: [],
  isUserLoggedIn: '',
  addRecipe: () => {},
  deleteRecipe: () => {},
  updateRecipe: () => {},
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  loggedIn: () => {},
  loggedOut: () => {},
  clearError: () => {},
  serError: () => {},
})

export default FamilyContext
