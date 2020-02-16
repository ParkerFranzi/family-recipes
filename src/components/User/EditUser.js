import React, { Component } from "react"
import FamilyContext from '../../FamilyContext'
import ValidationError from '../../ValidationError'
import AuthApiService from '../../services/auth-api-service'
import config from '../../config'
import TokenService from '../../services/token-service'
import { Roller } from 'react-awesome-spinners'

export default class AddUser extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }
    constructor(props) {
        super(props)
        this.state = {
            fName: {
                value: '',
            },
            lName: {
                value: '',

            },
            email: {
                value: '',
            },
            password: {
                value: '',

            },
            newPassword: {
                value: '',
            },
            confirmPassword: {
                value: '',
            },
            picture: {
                value: '',
                file: ''
            },
            public_id: {
                value: ''
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
        this.setState({password: {value: password, touched: true }})
    }
    updateNewPassword(newPassword) {
        this.setState({newPassword: {value: newPassword, touched: true }})
    }
    updateConfirmPassword(confirmPassword) {
        this.setState({confirmPassword: {value: confirmPassword, touched: true }})
    }
    updatePicture(name, picture) {
        this.setState({picture: {value: name, touched: true, file: picture[0] }})
    }
    setPicture(name, picture) {
        this.setState({picture: {value: name, file: picture }})
    }
    setPublicId(public_id) {
        this.setState({ public_id: { value: public_id }})
        console.log(public_id)
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

    handleSubmit = e => {
        e.preventDefault()
        this.setState({loading: true})
        const { fName, lName, email, password, picture, newPassword, confirmPassword, public_id } = this.state
        let formData = new FormData()

        formData.append('fname', fName.value)
        formData.append('lname', lName.value)
        formData.append('email', email.value)
        formData.append('password', password.value)
        formData.append('new_password', newPassword.value)
        formData.append('new_password_confirm', confirmPassword.value)
        formData.append('public_id', public_id.value)
        formData.append('picture', picture.file)
        console.log(this.state)
        for (var d of formData.entries()) {
            console.log(d)
        }
        AuthApiService.patchUser(formData, this.props.match.params.userId)
        .then(user => {
            fName.value = ''
            lName.value = ''
            email.value = ''
            password.value = ''
            picture.value = ''
            newPassword.value = ''
            confirmPassword.value = ''
            public_id.value = ''
            this.setState({ loading: false })
            console.log(1)
            this.context.updateUser(user)
            console.log(user)
            this.props.history.push(`/users/${user.id}`)
            console.log(test)
        })
        .catch(res => {
            this.setState({ loading: false })
            this.setState({ error: res.error })
        })
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch(`${config.API_ENDPOINT}/users/edit-user/${this.props.match.params.userId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'role': `${TokenService.getUserRole()}`,
                'id': `${TokenService.getUserId()}`
              },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
        .then(user => {
            this.updateFirstName(user[0].fname)
            this.updateLastName(user[0].lname)
            this.setPicture(user[0].pic_name, user[0].picture)
            this.setPublicId(user[0].public_id)
            this.setState({ loading: false })
            this.updateEmail(user[0].email)
        })
        .catch(res => {
            this.setState({ loading: false })
            this.setState({ error: res.error })
        })
    }
    render() {
        const passwordError = this.validatePassword()
        const fNameError = this.validateFirstName()
        const lNameError = this.validateLastName()
        return(
            <section className="addUser">
                <h2>User Registration</h2>
                <form onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
                    {this.state.fName.touched && (<ValidationError message={fNameError} />)}
                    <div className="form-row">
                        <label htmlFor="fName">First Name *</label>
                        <input 
                            type="text" 
                            className="fName"
                            value={this.state.fName.value}
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
                            value={this.state.lName.value}
                            name="lName" 
                            id="lName"
                            aria-required="true"
                            aria-label="Last Name"
                            onChange={e => this.updateLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">Email *</label>
                        {this.state.email.value}
                        {/* <input 
                            type="email"
                            className="email"
                            name="email"
                            id="email"
                            aria-required="true"
                            aria-label="email"
                            onChange={e => this.updateEmail(e.target.value)}
                        /> */}
                    </div>
                    {this.state.password.touched && (<ValidationError message={passwordError} />)}
                    <div className="form-row">
                        <label htmlFor="password">Current Password</label>
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
                        <label htmlFor="new-password">New Password</label>
                        <input
                            type="password" 
                            className="new-password" 
                            name="new-password" 
                            id="new-password"
                            aria-label="new-password"
                            onChange={e => this.updateNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password" 
                            className="confirm-password" 
                            name="confirm-password" 
                            id="confirm-password"
                            aria-label="confirm-password"
                            onChange={e => this.updateConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="picture">Profile Picture</label>
                        <input
                            type="file"
                            id="picture"
                            name="picture"
                            accept=".jpg, .jpeg, .png"
                            onChange={e => this.updatePicture(e.target.value, e.target.files)}
                        />
                    </div>
                    <div className="form-row">
                        <button 
                            type="submit"
                            className="noteName_registration_button"
                            disabled={
                                this.validateFirstName() ||
                                this.validateLastName() ||
                                this.validatePassword()
                            }
                        >
                            Update User
                        </button>
                        {this.state.loading && <Roller />}
                        {this.state.error && (<ValidationError message={this.state.error} />)}
                    </div>
                </form>
            </section>
        )
    }
}