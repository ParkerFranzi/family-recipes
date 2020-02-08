import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import config from '../../config'

export default class UserList extends Component {

    render() {
        

        return (
            <NavLink to={`/users/${this.props.id}`}>
                <div className="user-box">
                    <div className="user-img">
                        <img  src={`${config.API_ENDPOINT}/users/images/${this.props.id}`} />
                    </div>
                    <div className="user-name">
                        <h3>{this.props.fname + " " + this.props.lname}</h3>
                    </div>
                </div>
            </NavLink>
        )
    }
}