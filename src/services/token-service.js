import config from '../config'

const TokenService = {
  saveAuthToken(token, user_id, role) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
    window.localStorage.setItem("family_recipes_user_id", user_id)
    window.localStorage.setItem("family_recipes_role", role)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  getUserId() {
    return window.localStorage.getItem("family_recipes_user_id")
  },
  getUserRole() {
    return window.localStorage.getItem("family_recipes_role")
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
    window.localStorage.removeItem("family_recipes_user_id")
    window.localStorage.removeItem("family_recipes_role")
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  }
}

export default TokenService
