import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import config from '../../config'

export default class UserList extends Component {

    render() {
        return (
            <NavLink to={`/users/${this.props.id}`}>
                <div className="user-box">
                    <div className="user-img">
                        <img alt={this.props.fname + "-profile-pic"} src={`${config.CLOUDINARY_URL}/w_400,q_auto/${this.props.public_id}.${this.props.pic_type}`} />
                    </div>
                    <div className="user-name">
                        <h3>{this.props.fname + " " + this.props.lname}</h3>
                    </div>
                </div>
            </NavLink>
        )
    }
}