import config from '../config'
import TokenService from '../services/token-service'

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postUser(user) {
      return fetch(`${config.API_ENDPOINT}/users`, {
          method: 'POST',
          body: user,
      })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()   
        )
  },
  postRecipe(recipe) {
      return fetch(`${config.API_ENDPOINT}/recipes`, {
          method: 'POST',
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: recipe,
      })
      .then(res => 
          (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json() 
        )
  },
  patchRecipe(recipe, recipeId) {
      return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
          method: 'PATCH',
          headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: recipe,
      })
      .then(res => 
          (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
        
  }
}

export default AuthApiService