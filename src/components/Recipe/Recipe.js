import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import './Recipe.css'
import EditRecipe from './EditRecipe'

export default class Recipe extends Component {
    static contextType = ApiContext
    render() {
        const matchingRecipe = Number(this.props.match.params.recipeId)
        const recipeFilter = this.context.recipes.filter(recipe => recipe.recipeId === matchingRecipe)
        if (recipeFilter[0] === undefined) {
            return "Recipe not found"
        }
        const ingredientList = Object.entries(recipeFilter[0].ingredients)
        const instructionList = Object.entries(recipeFilter[0].instructions)
        console.log(ingredientList)
        return (
            <section className="recipe">
                <h1>{recipeFilter[0].dishName}</h1>
                <img src={recipeFilter[0].image} />
                <p className="description">{recipeFilter[0].description}</p>
                <ul className="ingredients">
                    {ingredientList.map(ingredient =>
                        <li key={ingredient[0]}>
                            <p>{ingredient[1]}</p> 
                        </li>   
                    )}
                </ul>
                <ul className="instructions">
                    {instructionList.map(instruction =>
                        <li key={instruction[0]}>
                            <p>{instruction[0] + ". " + instruction[1]}</p> 
                        </li>   
                    )}
                </ul>
                <EditRecipe recipe={recipeFilter[0]} />
                
            </section>
        )
    }
}