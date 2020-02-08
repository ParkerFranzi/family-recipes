import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import './Recipe.css'
import { Link } from 'react-router-dom'
import EditRecipe from './EditRecipe'
import config from '../../config'

export default class Recipe extends Component {
    state = {
        edit: false
    }

    handleEdit = () => {
        this.setState({
            edit: true
        })
    }
    static contextType = FamilyContext
    render() {
        if (!this.context.recipes.length) {
            return <ul></ul>
        }
        console.log(this.context)
        const matchingRecipe = Number(this.props.match.params.recipeId)
        const recipeFilter = this.context.recipes.filter(recipe => recipe.id === matchingRecipe)

        const ingredientArray = recipeFilter[0].ingredients.ingredientList
        const instructionArray = recipeFilter[0].instructions.instructionList

        
        return (
            <section className="recipe">
                <h1>{recipeFilter[0].dishname}</h1>
                <img src={`${config.API_ENDPOINT}/recipes/images/${recipeFilter[0].pic_name}`} />
                <p className="description">{recipeFilter[0].description}</p>
                <p className="prep-time">Prep Time: {recipeFilter[0].preptime}</p>
                <p className="cook-time">Cook Time: {recipeFilter[0].cooktime}</p>
                <p>Ingredients</p>
                <ul className="ingredients">
                    {ingredientArray.map((ingredient, index) =>
                        <li key={index + ingredient}>
                            {console.log(ingredient, index)}
                            <p>{(index + 1) + ": " + ingredient}</p> 
                        </li>   
                    )}
                </ul>
                <p>Instructions</p>
                <ul className="instructions">
                    {instructionArray.map((instruction, index) =>
                        <li key={index + instruction}>
                            <p>{(index + 1) + ": " + instruction}</p> 
                        </li>   
                    )}
                </ul>
                {this.state.edit && <Link to={`/edit-recipe/${matchingRecipe}`}>Edit Recipe</Link>}
                {!this.state.edit && <button onClick={this.handleEdit}>Edit Recipe</button>}
                
                
                
            </section>
        )
    }
}