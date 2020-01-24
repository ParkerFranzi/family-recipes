import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class UserLogin extends Component {
    handleSubmit = e => {
        e.preventDefault()
        alert("User would be logged in and redirected to home page")
    }
    render() {
        return (
            <section className="user-login">
                <h2>User Login</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="email"
                        name="email"
                        id="email"
                        aria-required="true"
                        aria-label="Email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        className="password"
                        name="password"
                        id="password"
                        aria-required="true"
                        aria-label="Password"
                    />
                    <button
                        type="submit"
                        className="user-login-button"
                    >
                        Login
                    </button>
                    
                    <NavLink to={`/register`}>
                        <div className="register-link">
                            <p>Need to register still?</p>
                        </div>
                    </NavLink>               
                </form>
            </section>
        )
    }
}