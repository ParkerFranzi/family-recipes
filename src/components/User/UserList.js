import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class UserList extends Component {
    render() {
        return (
            <NavLink to={`/user/${this.props.userId}`}>
                <div className="user-box">
                    <div className="user-img">
                        <img src={this.props.picture} />
                    </div>
                    <div className="user-name">
                        <h3>{this.props.fName + " " + this.props.lName}</h3>
                    </div>
                </div>
            </NavLink>
        )
    }
}