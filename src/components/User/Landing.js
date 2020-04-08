import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import UserList from './UserList'
import './Landing.css'
import Intro from '../Intro/Intro'


export default class Landing extends Component {
    static contextType = FamilyContext
    render() {
        const { users } = this.context
        const sortedList = users.sort((a, b) => a.id - b.id)
        const userList = sortedList.map((user, key) => <UserList {...user} key={key} />)
        console.log(users)
        return (
            <div className="landing-page">
                <Intro />
                <h2 className="section-title">Chefs</h2>
                {userList}
            </div>
        )
    }
}