import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import FamilyContext from './FamilyContext'
import Header from './components/Header/Header'
import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'
import AddUser from './components/User/AddUser'
import UserError from './components/User/UserError'
import AddRecipe from './components/Recipe/AddRecipe'
import RecipeError from './components/Recipe/RecipeError'
import Recipe from './components/Recipe/Recipe'
import Landing from './components/User/Landing'
import UserLanding from './components/User/UserLanding'
import LoginPage from './components/Login/LoginPage'
import EditRecipe from './components/Recipe/EditRecipe'
import config from './config'
import TokenService from './services/token-service'


class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        users: [],
        recipes: [],
        isUserLoggedIn: false,
        hasError: false
      }
  }

  
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  
  setUsers = users => {
    this.setState({
      users: users
    })
  }
  setRecipes = recipes => {
    this.setState({
      recipes: recipes
    })
  }
  addRecipe = (recipe) => {
    console.log(recipe)
    this.setState({
      recipes: [
        ...this.state.recipes,
        recipe
      ]
    })
  }
  updateRecipe = (recipe) => {
    const recipeFiltered = this.state.recipes.filter(recipes => recipes.id !== recipe.id)
    console.log(recipeFiltered)
    this.setState({
      recipes: [
        ...recipeFiltered,
        recipe
      ]
    })
    console.log(this.state)
  }
  addUser = (user) => {
    this.setState({
      users: [
        ...this.state.users,
        user
      ]
    })
  }
  loggedIn = () => {
    this.setState({isUserLoggedIn: true})
  }
  loggedOut = () => {
    this.setState({isUserLoggedIn: false})
  }
  checkLogin() {
    if (TokenService.hasAuthToken()) {
      this.setState({isUserLoggedIn: true})
    }
  }
  componentDidMount() {
    //API Fetch when I need to add it
    Promise.all([
      fetch(`${config.API_ENDPOINT}/users`),
      fetch(`${config.API_ENDPOINT}/recipes`)
    ])

    .then(([usersRes, recipesRes]) => {
        if(!usersRes.ok)
            return usersRes.json().then(e => Promise.reject(e));
        if (!recipesRes.ok)
            return recipesRes.json().then(e => Promise.reject(e));
        return Promise.all([usersRes.json(), recipesRes.json()])
    })
    .then(([users, recipes]) => {
        this.setState({users, recipes})
    })
    .catch(error => {console.log({ error })
    })
    
    this.checkLogin()
  }
  
  render() {
    const value = {
      users: this.state.users,
      recipes: this.state.recipes,
      addUser: this.addUser,
      addRecipe: this.addRecipe,
      deleteUser: this.deleteUser,
      deleteRecipe: this.deleteRecipe,
      updateRecipe: this.updateRecipe,
      loggedIn: this.loggedIn,
      loggedOut: this.loggedOut,
      isUserLoggedIn: this.state.isUserLoggedIn
    }
    return (
      <FamilyContext.Provider value={value}>
        <Header />
        <main className='App'>
        {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <PublicOnlyRoute
              exact path='/register'
              component={AddUser}
            />
            <Route
              path='/recipes/:recipeId'
              component={Recipe}
            />
            <PrivateRoute
              path='/edit-recipe/:recipeId'
              component={EditRecipe}
            />
            <PrivateRoute
              exact path='/add-recipe'
              component={AddRecipe}
            />
            <Route
              path='/users/:userId'
              component={UserLanding}
            />
            <Route
              exact path='/'
              component={Landing} 
            />
            <PublicOnlyRoute
              exact path='/login'
              component={LoginPage}
            />
          </Switch>
        </main>
      </FamilyContext.Provider>

    );

  }

}

export default App;