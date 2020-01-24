import React, { Component } from "react"
import ApiContext from '../../ApiContext'
import ValidationError from '../../ValidationError'

export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fName: {
                value: '',
                touched: false
            },
            lName: {
                value: '',
                touched: false
            },
            email: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
            profilePic: {
                value: '',
                touched: false
            }
        }
    }
    static contextType = ApiContext
    updateFirstName(fName) {
        this.setState({fName: {value: fName, touched: true }})
    }
    updateLastName(lName) {
        this.setState({lName: {value: lName, touched: true }})
    }
    updateEmail(email) {
        this.setState({email: {value: email, touched: true }})
    }
    updatePassword(password) {
        this.setState({password: {value: password, touched: true }})
    }
    updateProfilePic(profilePic) {
        this.setState({profilePic: {value: profilePic, touched: true }})
    }

    validateFirstName() {
        const fName = this.state.fName.value.trim()
        if (fName.length === 0) {
            return "Please enter in a first name"
        }
    }
    validatePassword() {
        const password = this.state.password.value.trim()
        if (password.length < 5) {
            return "Please enter a password longer than 5 characters"
        }
    }
    validateLastName() {
        const lName = this.state.lName.value.trim()
        if (lName.length === 0) {
            return "Please enter a last name"
        }
    }
    validateProfilePic() {

    }
    handleSubmit = e => {
        e.preventDefault()
        const { fName, lName, email, password, profilePic } = e.target
        console.log(fName.value, lName.value, email.value, password.value, profilePic.value )
    }
    render() {
        const passwordError = this.validatePassword()
        const fNameError = this.validateFirstName()
        const lNameError = this.validateLastName()
        return(
            <section className="addUser">
                <h2>User Registration</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    {this.state.fName.touched && (<ValidationError message={fNameError} />)}
                    <div className="form-row">
                        <label htmlFor="fName">First Name *</label>
                        <input 
                            type="text" 
                            className="fName" 
                            name="fName" 
                            id="fName"
                            aria-required="true"
                            aria-label="First Name"
                            onChange={e => this.updateFirstName(e.target.value)}
                        />
                    </div>
                    {this.state.lName.touched && (<ValidationError message={lNameError} />)}
                    <div className="form-row">
                        <label htmlFor="lName">Last Name *</label>
                        <input 
                            type="text" 
                            className="lName" 
                            name="lName" 
                            id="lName"
                            aria-required="true"
                            aria-label="Last Name"
                            onChange={e => this.updateLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email *</label>
                        <input 
                            type="email"
                            className="email"
                            name="email"
                            id="email"
                            aria-required="true"
                            aria-label="email"
                            onChange={e => this.updateEmail(e.target.value)}
                        />
                    </div>
                    {this.state.password.touched && (<ValidationError message={passwordError} />)}
                    <div className="form-row">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" 
                            className="password" 
                            name="password" 
                            id="password"
                            aria-label="password"
                            onChange={e => this.updatePassword(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="profilePic">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePic"
                            name="profilePic"
                            accept=".jpg, .jpeg, .png"
                            onChange={e => this.updateProfilePic(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <button 
                            type="submit"
                            className="noteName_registration_button"
                            disabled={
                                this.validateFirstName() ||
                                this.validateLastName() ||
                                this.validatePassword() ||
                                this.validateProfilePic()
                            }
                        >
                            Register
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}