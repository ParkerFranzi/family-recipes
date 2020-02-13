import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import config from '../../config'

export default class UserList extends Component {

    render() {
        console.log(this.props)

        return (
            <NavLink to={`/users/${this.props.id}`}>
                <div className="user-box">
                    <div className="user-img">
                        <img  src={`${this.props.picture}`} />
                    </div>
                    <div className="user-name">
                        <h3>{this.props.fname + " " + this.props.lname}</h3>
                    </div>
                </div>
            </NavLink>
        )
    }
}