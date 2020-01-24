import React, { Component } from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import './UserLanding.css'
import Recipe from '../Recipe/Recipe'

class UserLanding extends Component {
    static contextType = ApiContext

    render() {
        if (!this.context.users.length) {
            return <ul></ul>
        }
        const matchingUserId = Number(this.props.match.params.userId)
        const filter = this.context.recipes.filter(recipe => recipe.userId === matchingUserId)

        return (
            <ul className="recipe-list">
                {filter.map(recipe => 
                    <li key={recipe.recipeId}>
                        <NavLink to={`/recipe/${recipe.recipeId}`}>
                            <h2>{recipe.dishName}</h2>
                        </NavLink>
                        <img src={recipe.image} />
                        <p>{recipe.description}</p>
                    </li>

                )}

            </ul>
        )
        
    }
}

export default UserLanding