import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import FamilyContext from '../../FamilyContext'
import './UserLanding.css'
import config from '../../config'
import TextTruncate from 'react-text-truncate'



class UserLanding extends Component {
    static contextType = FamilyContext

    render() {
        if (!this.context.users.length) {
            return <ul></ul>
        }
        const { users, recipes } = this.context
        const matchingUserId = Number(this.props.match.params.userId)
        const recipeFilter = recipes.filter(recipe => recipe.userid === matchingUserId)
        const userFilter = users.filter(user => user.id === matchingUserId)
        const {fname, lname, public_id, pic_type} = userFilter[0]
        if (userFilter[0] === undefined) 
            return (
                <section className="user-landing">
                    <p>User doesn't exist</p>
                </section>
            )
        if (recipeFilter[0] === undefined) 
            return (
                <section className="user-landing">
                    <h2 className="user-landing-heading">{fname + " " + lname} Recipes</h2>
                    <ul className="recipe-list">
                        <li>There are no recipes right now</li>
                    </ul>
                </section>
            )
            

        return (
            <section className="user-landing">
                <h2 className="user-landing-heading">{fname + " " + lname + "'s"} Recipes</h2>
                <div className="user-img">
                    <img alt={fname + "-pic"} src={`${config.CLOUDINARY_URL}/w_250,h_250,q_auto,c_thumb/${public_id}.${pic_type}`} />
                </div>
                <ul className="recipe-list">
                    {recipeFilter.map(recipe => 
                        <li key={recipe.id}>

                            <div className='imageHolder' title={recipe.dishname + "-pic"} style={{backgroundImage: `url('${config.CLOUDINARY_URL}/h_200,q_auto/${recipe.public_id}.${recipe.pic_type}')`}}>
                                
                            </div>
                            <NavLink to={`/recipes/${recipe.id}`}>
                                <h2>{recipe.dishname}</h2>
                            </NavLink>
                            <TextTruncate
                                text={recipe.description}
                                line={3}
                                truncateText='...'
                                element="p"
                            />
                        </li>

                    )}

                </ul>

            </section>

        )
        
    }
}

export default UserLanding