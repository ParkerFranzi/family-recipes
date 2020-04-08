import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import FamilyContext from '../../FamilyContext'
import TextTruncate from 'react-text-truncate'
import config from '../../config'
import './RandomRecipe.css'

export default class RandomRecipe extends Component {
    static contextType = FamilyContext
    randomRecipe = (length) => {
        return Math.floor(Math.random() * Math.floor(length))
    }
    render() {
        if (!this.context.recipes.length) {
            return <ul></ul>
        }
        const recipeList = this.context.recipes
        const randomOne = this.randomRecipe(recipeList.length - 1)
        const featureRecipe = recipeList[randomOne]
        const filterList = recipeList.filter(recipe => recipe.id !== featureRecipe.id)
        const randomTwo = this.randomRecipe(recipeList.length - 2)
        const featureRecipeTwo = filterList[randomTwo]
        return (
            <div className="random-recipes">
                <div className="random-recipe">
                    <img alt={featureRecipe.dishname + "-pic"} src={`${config.CLOUDINARY_URL}/h_400,q_auto/${featureRecipe.public_id}.${featureRecipe.pic_type}`} />
                    <NavLink to={`/recipes/${featureRecipe.id}`}>
                        <h2>{featureRecipe.dishname}</h2>
                    </NavLink>
                    <TextTruncate
                        text={featureRecipe.description}
                        line={3}
                        truncateText='...'
                        element="p"
                    />
                </div>
                <div className="random-recipe">
                    <img alt={featureRecipeTwo.dishname + "-pic"} src={`${config.CLOUDINARY_URL}/h_400,q_auto/${featureRecipeTwo.public_id}.${featureRecipeTwo.pic_type}`} />
                    <NavLink to={`/recipes/${featureRecipeTwo.id}`}>
                        <h2>{featureRecipeTwo.dishname}</h2>
                    </NavLink>
                    <TextTruncate
                        text={featureRecipeTwo.description}
                        line={3}
                        truncateText='...'
                        element="p"
                    />
                </div>
            </div>
        )
    }
}