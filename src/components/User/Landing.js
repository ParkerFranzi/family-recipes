import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import UserList from './UserList'
import './Landing.css'


export default class Landing extends Component {
    static contextType = ApiContext
    render() {
        const { users } = this.context
        const userList = users.map((user, key) => <UserList {...user} key={key} />)
        console.log(userList)
        return (
            <div className="landing-page">
                {userList}
            </div>
        )
    }
}