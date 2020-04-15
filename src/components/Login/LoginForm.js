import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'
import ValidationError from '../../ValidationError'

export default class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    handleSubmitJwtAuth = e => {
        e.preventDefault()
        this.setState({ error: null })
        const { email, password } = e.target

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
        .then(res => {
            email.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken, res.user_id, res.role)
            
            this.props.onLoginSuccess()
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }
    render() {
        return (
                <form onSubmit={this.handleSubmitJwtAuth}>
                    <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="email"
                            name="email"
                            id="email"
                            aria-required="true"
                            aria-label="Email"
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="password"
                            name="password"
                            id="password"
                            aria-required="true"
                            aria-label="Password"
                        />
                    </div>
                    <div id="submit-button" className="form-row">
                        <button
                            type="submit"
                            className="user-login-button"
                        >
                            Login
                        </button>
                    </div>
                    {this.state.error && <ValidationError message={this.state.error} />}
                    <NavLink to={`/register`}>
                        <div className="register-link">
                            <p>Need to register still?</p>
                        </div>
                    </NavLink>               
                </form>

        )
    }
}