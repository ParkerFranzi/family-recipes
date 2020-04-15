import React, { Component } from "react"
import FamilyContext from '../../FamilyContext'
import ValidationError from '../../ValidationError'
import AuthApiService from '../../services/auth-api-service'
import { Roller } from 'react-awesome-spinners'

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
                value: ''
            },
            passwordTouch: {
                touched: false,
            },
            picture: {
                value: '',
                touched: false, 
                file: ''
            }, 
            loading: false,
            error: null
        }
    }
    static contextType = FamilyContext
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
        this.setState({password: {value: password }})
    }
    updatepicture(name, picture) {
        this.setState({picture: {value: name, touched: true, file: picture[0] }})
    }
    passwordBlur() {
        this.setState({passwordTouch: { touched: true }})
    }
    validateFirstName() {
        const fName = this.state.fName.value.trim()
        if (fName.length === 0) {
            return "Please enter in a first name"
        }
    }
    validatePassword() {
        const password = this.state.password.value.trim()
        if (password.length < 8) {
            return "Please enter a password at least 8 characters"
        }
        if (password.length > 71) {
            return "Password must be less than 72 characters"
        }
        if (!(password.match(/(?=.*[a-z])/))) {
            return "Password must contain a lowercase letter"
        }
        if (!(password.match(/(?=.*[A-Z])/))) {
            return "Password must contain a capital letter"
        }
        if (!(password.match(/(?=.*\d)/))) {
            return "Password must contain a number"
        }
        if(!(/[\s~`!@#$%^&*+=\-[\]\\';,/{}|\\":<>?()._]/g.test(password))) {
            return "Password must contain a special character"
        }
    }
    validateLastName() {
        const lName = this.state.lName.value.trim()
        if (lName.length === 0) {
            return "Please enter a last name"
        }
    }
    validatepicture() {

    }
    handleSubmit = e => {
        e.preventDefault()
        this.setState({loading: true})
        const { fName, lName, email, password, picture } = e.target
        let formData = new FormData()

        formData.append('fname', fName.value)
        formData.append('lname', lName.value)
        formData.append('email', email.value)
        formData.append('password', password.value)
        formData.append(`picture`, this.state.picture.file)

        AuthApiService.postUser(formData)
        .then(user => {
            fName.value = ''
            lName.value = ''
            email.value = ''
            password.value = ''
            picture.value = ''
            console.log(user)
            this.setState({loading: false})
            this.context.addUser(user)
            this.props.history.push('/login')
        })
        .catch(res => {
            this.setState({loading: false})
            this.setState({ error: res.error })
        })
    }
    render() {
        const passwordError = this.validatePassword()
        const fNameError = this.validateFirstName()
        const lNameError = this.validateLastName()
        return(
            <section className="addUser">
                <h1>User Registration</h1>
                <form onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
                    {this.state.fName.touched && (<ValidationError message={fNameError} />)}
                    <div className="form-row">
                        <label htmlFor="fName">First Name <span className="require-input">*</span></label>
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
                        <label htmlFor="lName">Last Name <span className="require-input">*</span></label>
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
                        <label htmlFor="email">Email <span className="require-input">*</span></label>
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
                    <div className="form-row">
                        <label htmlFor="password">Password <span className="require-input">*</span></label>
                        <p className="password-req">Password must contain 1 upper case, lower case, number and special character</p>
                        <input
                            type="password" 
                            className="password" 
                            name="password" 
                            id="password"
                            aria-label="password"
                            onBlur={() => this.passwordBlur()}
                            onChange={e => this.updatePassword(e.target.value)}
                        />
                        {this.state.passwordTouch.touched && (<ValidationError message={passwordError} />)}
                    </div>
                    <div className="form-row">
                        <label htmlFor="picture">Profile Picture <span className="require-input">*</span></label>
                        <input
                            type="file"
                            id="picture"
                            name="picture"
                            accept=".jpg, .jpeg, .png"
                            onChange={e => this.updatepicture(e.target.value, e.target.files)}
                        />
                    </div>
                    <div id="submit-button" className="form-row">
                        <button 
                            type="submit"
                            className="noteName_registration_button"
                            disabled={
                                this.validateFirstName() ||
                                this.validateLastName() ||
                                this.validatePassword() ||
                                this.validatepicture()
                            }
                        >
                            Register
                        </button>
                        {this.state.loading && <Roller />}
                        {this.state.error && (<ValidationError message={this.state.error} />)}
                    </div>
                </form>
            </section>
        )
    }
}