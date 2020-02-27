import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import FamilyContext from '../../FamilyContext'
import './UserLanding.css'
import config from '../../config'


class UserLanding extends Component {
    static contextType = FamilyContext

    render() {
        if (!this.context.users.length) {
            return <ul></ul>
        }
        const matchingUserId = Number(this.props.match.params.userId)
        const recipeFilter = this.context.recipes.filter(recipe => recipe.userid === matchingUserId)
        const userFilter = this.context.users.filter(user => user.id === matchingUserId)
        if (userFilter[0] === undefined) 
            return (
                <section className="user-landing">
                    <p>User doesn't exist</p>
                </section>
            )
        if (recipeFilter[0] === undefined) 
            return (
                <section className="user-landing">
                    <h2 className="user-landing-heading">{userFilter[0].fname + " " + userFilter[0].lname} Recipes</h2>
                    <ul className="recipe-list">
                        <li>There are no recipes right now</li>
                    </ul>
                </section>
            )
            

        return (
            <section className="user-landing">
                <h2 className="user-landing-heading">{userFilter[0].fname + " " + userFilter[0].lname + "'s"} Recipes</h2>
                <ul className="recipe-list">
                    {recipeFilter.map(recipe => 
                        <li key={recipe.id}>
                            <NavLink to={`/recipes/${recipe.id}`}>
                                <h2>{recipe.dishname}</h2>
                            </NavLink>
                            <img alt={recipe.dishname + "-pic"} src={`${config.CLOUDINARY_URL}/w_500,q_auto/${recipe.public_id}.${recipe.pic_type}`} />
                            <p>{recipe.description}</p>
                        </li>

                    )}

                </ul>

            </section>

        )
        
    }
}

export default UserLanding