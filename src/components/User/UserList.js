import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class UserList extends Component {
    render() {

        const picture = btoa(
            new Uint8Array(this.props.picture.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );

        return (
            <NavLink to={`/users/${this.props.id}`}>
                <div className="user-box">
                    <div className="user-img">
                        <img src={`data:${this.props.pic_type};base64,${picture}`} />
                    </div>
                    <div className="user-name">
                        <h3>{this.props.fname + " " + this.props.lname}</h3>
                    </div>
                </div>
            </NavLink>
        )
    }
}