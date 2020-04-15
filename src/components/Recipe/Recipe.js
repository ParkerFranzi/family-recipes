import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import './Recipe.css'
import { Link } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class Recipe extends Component {
    state = {
        edit: false,
        id: '',
        admin: ''
    }

    handleEdit = () => {
        this.setState({
            edit: true
        })
    }
    setRole(role) {
        if (Number(role) === 3)
        this.setState({ admin: true })
    }
    setId(id) {
        this.setState({ id: Number(id) })
    }
    componentDidMount() {
        this.setId(TokenService.getUserId())
        this.setRole(TokenService.getUserRole())
    }
    static contextType = FamilyContext
    render() {
        if (!this.context.recipes.length) {
            return <ul></ul>
        }
        console.log(this.context)
        console.log(this.state)
        const matchingRecipe = Number(this.props.match.params.recipeId)
        const recipeFilter = this.context.recipes.filter(recipe => recipe.id === matchingRecipe)
        const {dishname, public_id, pic_type, description, preptime, cooktime, ingredients, instructions, userid, servings} = recipeFilter[0]
        if (recipeFilter[0] === undefined) {
            return <div className="edit-recipe-form">
                <p>Recipe not found</p>
            </div>
        }
        const ingredientArray = ingredients.ingredientList
        const instructionArray = instructions.instructionList

        
        return (
            <section className="recipe">
                <h1>{dishname}</h1>
                <div className="recipe-img-container">
                    <img alt={dishname + "-pic"} src={`${config.CLOUDINARY_URL}/w_950,q_auto/${public_id}.${pic_type}`} />
                </div>
                
                {(this.state.admin === true || this.state.id === userid) && <Link className="edit-recipe" to={`/edit-recipe/${matchingRecipe}`}>Edit Recipe</Link>}
                <h3>Description</h3>
                <p className="description-text">{description}</p>
                <p className="prep-time"><b>Prep Time:</b> {preptime}</p>
                <p className="cook-time"><b>Cook Time:</b> {cooktime}</p>
                <p className="servings"><b>Servings:</b> {servings}</p>
                <h3>Ingredients</h3>
                <ul className="ingredients">
                    {ingredientArray.map((ingredient, index) =>
                        <li key={index + ingredient}>
                            <p>{ingredient}</p> 
                        </li>   
                    )}
                </ul>
                <h3>Instructions</h3>
                <ul className="instructions">
                    {instructionArray.map((instruction, index) =>
                        <li key={index + instruction}>
                            <p><span>{(index + 1) + ".  "}</span> {instruction}</p> 
                        </li>   
                    )}
                </ul>
                <Link to={`/users/${userid}`}>
                    <p>Back to recipes</p>
                </Link>  
            </section>
        )
    }
}