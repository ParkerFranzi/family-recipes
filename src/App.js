import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ApiContext from './ApiContext'
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


class App extends Component {

  state = {
      users: this.props.users,
      recipes: this.props.recipes,
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
  }
  
  render() {
    const value = {
      users: this.state.users,
      recipes: this.state.recipes,
    }
    return (
      <ApiContext.Provider value={value}>
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
              path='/recipe/:recipeId'
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
            path='/user/:userId'
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
      </ApiContext.Provider>

    );

  }

}

export default App;