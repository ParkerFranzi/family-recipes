import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import FamilyContext from './FamilyContext'
import Header from './components/Header/Header'
import AddUser from './components/User/AddUser'
import UserError from './components/User/UserError'
import AddRecipe from './components/Recipe/AddRecipe'
import RecipeError from './components/Recipe/RecipeError'
import Recipe from './components/Recipe/Recipe'
import Landing from './components/User/Landing'
import UserLanding from './components/User/UserLanding'
import UserLogin from './components/Login/UserLogin'
import EditRecipe from './components/Recipe/EditRecipe'
import config from './config'


class App extends Component {

  state = {
      users: [],
      recipes: [],
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
    
  }
  
  render() {
    const value = {
      users: this.state.users,
      recipes: this.state.recipes,
    }
    console.log(this.state)
    return (
      <FamilyContext.Provider value={value}>
        <Header />
        <main className='App'>
          <UserError>
            <Route
              exact path='/register'
              component={AddUser}
            />
          </UserError>
          <RecipeError>
            <Route
              path='/recipes/:recipeId'
              component={Recipe}
            />
          </RecipeError>
          <Route
            path='/edit-recipe/:recipeId'
            component={EditRecipe}
          />
          <Route
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
         <Route
            exact path='/login'
            component={UserLogin}
          />
        </main>
      </FamilyContext.Provider>

    );

  }

}

export default App;