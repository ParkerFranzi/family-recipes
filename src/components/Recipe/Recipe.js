import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import './Recipe.css'
import EditRecipe from './EditRecipe'

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
        const matchingRecipe = Number(this.props.match.params.recipeId)
        const recipeFilter = this.context.recipes.filter(recipe => recipe.id === matchingRecipe)

        const ingredientArray = recipeFilter[0].ingredients.ingredientList
        const instructionArray = recipeFilter[0].instructions.instructionList

        const image = btoa(
            new Uint8Array(recipeFilter[0].image.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        
        return (
            <section className="recipe">
                <h1>{recipeFilter[0].dishname}</h1>
                <img src={`data:${recipeFilter[0].pic_type};base64,${image}`} />
                <p className="description">{recipeFilter[0].description}</p>
                <p className="prep-time">Prep Time: {recipeFilter[0].preptime}</p>
                <p className="cook-time">Cook Time: {recipeFilter[0].cooktime}</p>
                <ul className="ingredients">
                    {ingredientArray.map((ingredient, index) =>
                        <li key={index + ingredient}>
                            {console.log(ingredient, index)}
                            <p>{(index + 1) + ": " + ingredient}</p> 
                        </li>   
                    )}
                </ul>
                <ul className="instructions">
                    {instructionArray.map((instruction, index) =>
                        <li key={index + instruction}>
                            <p>{(index + 1) + ": " + instruction}}</p> 
                        </li>   
                    )}
                </ul>
                {this.state.edit && <EditRecipe recipe={recipeFilter[0]} />}
                {!this.state.edit && <button onClick={this.handleEdit}>Edit Recipe</button>}
                
                
                
            </section>
        )
    }
}