import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import UserList from './UserList'
import './Landing.css'


export default class Landing extends Component {
    static contextType = FamilyContext
    render() {
        const { users } = this.context
        const sortedList = users.sort((a, b) => a.id - b.id)

        const userList = sortedList.map((user, key) => <UserList {...user} key={key} />)
        
        return (
            <div className="landing-page">
                {userList}
            </div>
        )
    }
}