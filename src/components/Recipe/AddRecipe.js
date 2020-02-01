import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import AuthApiService from '../../services/auth-api-service'


export default class AddRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishName: {
                value: '',
                touched: false
            },
            description: {
                value: '',
                touched: false
            },
            ingredients: [
                { ingredient: '' }
            ],
            instructions: [ 
                { instruction: '' }
            ],
            dishPic: {
                value: '',
                touched: false,
                file: ''
            },
            recipeCreator: {
                value: '',
                touched: false
            },
            prepTime: {
                value: '',
                touched: false
            },
            cookTime: {
                value: '',
                touched: false
            }

        }
    }
    updateDishName(dishName) {
        this.setState({dishName: {value: dishName, touched: true}})
    }
    updateRecipeCreator(recipeCreator) {
        this.setState({recipeCreator: {value: recipeCreator, touched: true}})
    }
    updateDescription(description) {
        this.setState({description: {value: description, touched: true}})
    }
    updateDishPic(name, dishPic) {
        this.setState({dishPic: {value: name, touched: true, file: dishPic[0]}})
    }
    updatePrepTime(prepTime) {
        this.setState({prepTime: {value: prepTime, touched: true }})
    }
    updateCookTime(cookTime) {
        this.setState({cookTime: {value: cookTime, touched: true }})
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
            ingredients: this.state.ingredients.concat([{ ingredient: "" }])
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
            instructions: this.state.instructions.concat([{ instruction: "" }])
        })
    }
    handleRemoveinstruction = index => () => {
        this.setState({
            instructions: this.state.instructions.filter((instruction, instructionIndex) => index !== instructionIndex)
        })
    }
    formIngredientList = ingredients => {
        let ingredientList = []
        const newLine = { ingredientList }
        for (let i=0; i<ingredients.length; i++) {
            ingredientList.push(ingredients[i].ingredient)
        }
        return newLine
    }
    formInstructionList = instructions => {
        let instructionList = []
        const newLine = { instructionList }
        for (let i=0; i<instructions.length; i++) {
            instructionList.push(instructions[i].instruction)
        }
        return newLine
    }
    handleSubmit = e => {
        e.preventDefault()
        const { dishName, description, ingredients, instructions, dishPic, prepTime, cookTime, recipeCreator } = this.state

        const ingredientList = this.formIngredientList(ingredients)
        const instructionList = this.formInstructionList(instructions)
        console.log(ingredientList)

        let formData = new FormData()
        formData.append('dishname', dishName.value)
        formData.append('userid', recipeCreator.value)
        formData.append('description', description.value)
        formData.append('preptime', prepTime.value)
        formData.append('cooktime', cookTime.value)
        formData.append('image', dishPic.file)
        formData.append('ingredients', JSON.stringify(ingredientList))
        formData.append('instructions', JSON.stringify(instructionList))

        for (var value of formData.values()) {
            console.log(value); 
         }

        AuthApiService.postRecipe(formData)
        .then(recipe => {
            dishName.value = ''
            description.value = ''
            ingredients.ingredient = ''
            instructions.instruction = ''
            dishPic.value = ''
            prepTime.value = ''
            cookTime.value = ''
            recipeCreator.value = ''
            this.context.addRecipe(recipe)
            this.props.history.push(`/recipes/${recipe.id}`)
        })
    }
    static contextType = FamilyContext
    render() {
        return (
            <div className="add-recipe-form">
                <form onSubmit={this.handleSubmit}>
                    <div id="dish-name" className="form-row">
                        <label htmlFor="dish-name">Dish Name</label>
                        <input
                            name="dishName"
                            type="text"
                            required
                            id="dishName"
                            onChange={e => this.updateDishName(e.target.value)}
                        />
                    </div>
                    <div id="recipe-creator" className="form-row">
                        <label htmlFor="recipe-creator">Recipe Creator</label>
                        <select
                            type="text"
                            id="recipeCreator"
                            name="recipeCreator"
                            defaultValue="default"
                            aria-required="true"
                            aria-label="Recipe Creator"
                            required
                            onChange={e => this.updateRecipeCreator(e.target.value)}
                        >
                            <option key="default" value="default" disabled>Select the recipe creator</option>
                            {this.context.users.map(user =>
                                <option key={user.id} value={user.id}>{user.fname + " " + user.lname}</option>    
                            )}
                        </select>

                    </div>
                    <div id="recipe-description" className="form-row">
                        <label htmlFor="description">Recipe Description</label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
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
                            name="prepTime"
                            id="prepTime"
                            required
                            aria-required="true"
                            aria-label="Prep Time"
                            onChange={e => this.updatePrepTime(e.target.value)}
                        />
                        <label htmlFor="cook-time">Cook Time</label>
                        <input
                            type="text"
                            name="cookTime"
                            id="cookTime"
                            required
                            aria-required="true"
                            aria-label="Cook Time"
                            onChange={e => this.updateCookTime(e.target.value)}
                        />
                    </div>
                    <div id="ingredients-list" className="form-row">
                        <label htmlFor="ingredients">Ingredients</label>
                        {this.state.ingredients.map((ingredient, index) => (
                            
                            <div className="ingredients" key={index}>
                                <input
                                    type="text"
                                    placeholder={`Ingredient #${index + 1} name`}
                                    value={ingredient.name}
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
                                    value={instruction.name}
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
                            name="dish-picture"
                            accept=".jpg, .jpeg, .png"
                            required
                            onChange={e => this.updateDishPic(e.target.value, e.target.files)}
                        />
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