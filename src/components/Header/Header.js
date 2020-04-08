import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FamilyContext from '../../FamilyContext'

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
  static contextType = FamilyContext

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.context.loggedOut()
  }
  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          to={`/edit-user/${TokenService.getUserId()}`}
        >
          Edit User
        </Link>
        <Link
          to='/add-recipe'
        >
          Add Recipe 
        </Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/register'>
          Register
        </Link>
      </div>
    )
  }
  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            Family Recipes
          </Link>
        </h1>
        <span className='Header__tagline'>Cook your family favorites</span>
        {this.context.isUserLoggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}
