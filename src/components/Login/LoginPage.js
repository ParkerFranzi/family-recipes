import React, { Component } from 'react'
import LoginForm from '../../components/Login/LoginForm'
import FamilyContext from '../../FamilyContext'


export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  static contextType = FamilyContext
  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    this.context.loggedIn()
    history.push(destination)
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}