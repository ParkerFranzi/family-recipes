import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'

export default class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishName: {
                value: this.props.recipe.dishName
            },
            description: {
                value: this.props.recipe.description
            },
            ingredients: [
                { ingredient: '' }
            ],
            instructions: [
                { instruction: '' }
            ],
            dishPic: {
                value: this.props.recipe.image
            },
            recipeCreator: {
                value: this.props.recipe.userId
            },
            prepTime: {
                value: this.props.recipe.prepTime
            },
            cookTime: {
                value: this.props.recipe.cookTime
            }

        }
    }

    updateDishName(dishName) {
        this.setState({dishName: {value: dishName}})
    }
    updateRecipeCreator(recipeCreator) {
        this.setState({recipeCreator: {value: recipeCreator}})
    }
    updateDescription(description) {
        this.setState({description: {value: description }})
    }
    updateDishPic(dishPic) {
        this.setState({dishPic: {value: dishPic }})
    }
    updatePrepTime(prepTime) {
        this.setState({prepTime: {value: prepTime }})
    }
    updateCookTime(cookTime) {
        this.setState({cookTime: {value: cookTime }})
    }
    handleSubmit = event => {
        event.preventDefault()
        const { dishName, description, ingredients, instructions, dishPic } = this.state
        console.log(dishName, description, ingredients)
        console.log(this.state)
    }
    handleIngredientNameChange = index => event => {
        const newIngredients = this.state.ingredients.map((ingredient, ingredientIndex) => {
            if (index !== ingredientIndex) 
                return ingredient
            return { ...ingredient, ingredient: event.target.value }
        })
        this.setState({ ingredients: newIngredients})
    }
    handleAddIngredient = () => {
        this.setState({
            ingredients: this.state.ingredients.concat([{ ingredient: '' }])
        })
    }
    handleRemoveIngredient = index => () => {
        this.setState({
            ingredients: this.state.ingredients.filter((ingredient, ingredientIndex) => index !== ingredientIndex)
        })
    }
    handleinstructionNameChange = index => event => {
        const newinstructions = this.state.instructions.map((instruction, instructionIndex) => {
            if (index !== instructionIndex) 
                return instruction
            return { ...instruction, instruction: event.target.value }
        })
        this.setState({ instructions: newinstructions})
    }
    handleAddinstruction = () => {
        this.setState({
            instructions: this.state.instructions.concat([{ instruction: '' }])
        })
    }
    handleRemoveinstruction = index => () => {
        this.setState({
            instructions: this.state.instructions.filter((instruction, instructionIndex) => index !== instructionIndex)
        })
    }
    handleIngredientInitialState() {
       const ingredientList = Object.values(this.props.recipe.ingredients)
       const ingredientArray = []
       ingredientList.forEach(ingredient => {
           ingredientArray.push({ingredient})
       })
       this.setState({ ingredients: ingredientArray})

    }
    handleInstructionInitialState() {
        const instructionList = Object.values(this.props.recipe.instructions)
        const instructionArray = []
        instructionList.forEach(instruction => {
            instructionArray.push({instruction})
        })
        this.setState({ instructions: instructionArray })
    }
    componentDidMount() {
        this.handleIngredientInitialState();
        this.handleInstructionInitialState();
    }
    static contextType = FamilyContext
    render() {
        console.log(this.state)
        
        return (
            <div className="edit-recipe-form">
                <form onSubmit={this.handleSubmit}>
                    <div id="dish-name" className="form-row">
                        <label htmlFor="dish-name">Dish Name</label>
                        <input
                            name="dish-name"
                            type="text"
                            required
                            value={this.props.recipe.dishName}
                            id="dish-name"
                            onChange={e => this.updateDishName(e.target.value)}
                        />
                    </div>
                    <div id="recipe-creator" className="form-row">
                        <label htmlFor="recipe-creator">Recipe Creator</label>
                        <select
                            type="text"
                            defaultValue={this.props.recipe.userId}
                            required
                            aria-required="true"
                            aria-label="Recipe Creator"
                            onChange={e => this.updateRecipeCreator(e.target.value)}
                        >
                            <option key="default" value="default" disabled>Select the recipe creator</option>
                            {this.context.users.map(user =>
                                <option key={user.userId} value={user.userId}>{user.fName + " " + user.lName}</option>    
                            )}
                        </select>

                    </div>
                    <div id="recipe-description" className="form-row">
                        <label htmlFor="description">Recipe Description</label>
                        <textarea
                            type="text"
                            value={this.props.recipe.description}
                            required
                            aria-required="true"
                            aria-label="Recipe Description"
                            onChange={e => this.updateDescription(e.target.value)}
                        />
                    </div>
                    <div id="recipie-time" className="form-row">
                        <label htmlFor="prep-time">Prep Time</label>
                        <input
                            type="text"
                            value={this.props.recipe.prepTime}
                            required
                            aria-required="true"
                            arai-label="Prep Time"
                            onChange={e => this.updatePrepTime(e.target.value)}
                        />
                        <label htmlFor="cook-time">Cook Time</label>
                        <input
                            type="text"
                            value={this.props.recipe.cookTime}
                            required
                            aria-required="true"
                            arai-label="Cook Time"
                            onChange={e => this.updateCookTime(e.target.value)}
                        />
                    </div>
                    <div id="ingredients-list" className="form-row">
                        <label htmlFor="ingredients">Ingredients</label>
                        {this.state.ingredients.map((ingredient, index) => (
                            
                            <div className="ingredients" key={index}>
                                <input
                                    type="text"
                                    placeholder={`ingredient #${index + 1} name`}
                                    value={ingredient.ingredient}
                                    onChange={this.handleIngredientNameChange(index)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={this.handleRemoveIngredient(index)}
                                    className="small-button"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                   
                        <button
                            type="button"
                            onClick={this.handleAddIngredient}
                            className="small-button"
                        >
                            Add Ingredient
                        </button>
                    </div>
                    <div id="instructions-list" className="form-row">
                        <label htmlFor="instructions">Directions</label>
                        {this.state.instructions.map((instruction, index) => (
                            
                            <div className="instructions" key={index}>
                                <input
                                    type="text"
                                    placeholder={`instruction #${index + 1} name`}
                                    value={instruction.instruction}
                                    onChange={this.handleinstructionNameChange(index)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={this.handleRemoveinstruction(index)}
                                    className="small-button"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                
                        <button
                            type="button"
                            onClick={this.handleAddinstruction}
                            className="small-button"
                        >
                            Add instruction
                        </button>
                    </div>
                    <div id="dish-picture" className="form-row">
                        <label htmlFor="dish-picture">Recipe Picture</label>
                        <input
                            type="file"
                            id="dish-picture"
                            value={this.props.recipe.dishPic}
                            name="dish-picture"
                            accept=".jpg, .jpeg, .png"
                            onChange={e => this.updateDishPic(e.target.value)}
                            required
                        />
                        <div className="current-picture">
                            Current Picture: <img src={this.state.dishPic.value} />
                        </div>
                    </div>
                    <button
                        type="submit"
                    >
                        Submit Recipe
                    </button>
                </form>
            </div>
        )
    }
}