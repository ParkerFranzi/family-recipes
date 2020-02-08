import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import AuthApiService from '../../services/auth-api-service'
import ValidationError from '../../ValidationError'
import config from '../../config'

export default class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishName: {
                value: this.props.recipe.dishname
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
                value: '',
                file: ''
            },
            recipeCreator: {
                value: this.props.recipe.userid
            },
            prepTime: {
                value: this.props.recipe.preptime
            },
            cookTime: {
                value: this.props.recipe.cooktime
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
    updateDishPic(name, dishPic) {
        this.setState({dishPic: {value: name, file: dishPic[0] }})
    }
    updatePrepTime(prepTime) {
        this.setState({prepTime: {value: prepTime }})
    }
    updateCookTime(cookTime) {
        this.setState({cookTime: {value: cookTime }})
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
    handleSubmit = event => {
        event.preventDefault()

        const { dishName, description, ingredients, instructions, dishPic, prepTime, cookTime, recipeCreator } = this.state

        const ingredientList = this.formIngredientList(ingredients)
        const instructionList = this.formInstructionList(instructions)
        const recipeId = this.props.recipe.id

        console.log(dishPic.file)

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

        AuthApiService.patchRecipe(formData, recipeId)
        .then(recipe => {
            dishName.value = ''
            description.value = ''
            ingredients.ingredient = ''
            instructions.instruction = ''
            dishPic.value = ''
            prepTime.value = ''
            cookTime.value = ''
            recipeCreator.value = ''
            recipe.ingredients = ingredientList
            recipe.instructions = instructionList
            this.context.updateRecipe(recipe)
            this.props.history.push(`/recipes/${recipe.id}`)
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
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
       const ingredientList = this.props.recipe.ingredients.ingredientList
       const ingredientArray = []
       ingredientList.forEach(ingredient => {
           ingredientArray.push({ingredient})
       })
       this.setState({ ingredients: ingredientArray})

    }
    handleInstructionInitialState() {
        const instructionList = this.props.recipe.instructions.instructionList
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
        const matchingRecipe = Number(this.props.recipe.id)
        return (
            <div className="edit-recipe-form">
                <form onSubmit={this.handleSubmit}>
                    <div id="dish-name" className="form-row">
                        <label htmlFor="dish-name">Dish Name</label>
                        <input
                            name="dish-name"
                            type="text"
                            required
                            defaultValue={this.state.dishName.value}
                            id="dish-name"
                            onChange={e => this.updateDishName(e.target.value)}
                        />
                    </div>
                    <div id="recipe-creator" className="form-row">
                        <label htmlFor="recipe-creator">Recipe Creator</label>
                        <select
                            type="text"
                            defaultValue={this.state.recipeCreator.value}
                            required
                            aria-label="Recipe Creator"
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
                            value={this.state.description.value}
                            required
                            aria-label="Recipe Description"
                            onChange={e => this.updateDescription(e.target.value)}
                        />
                    </div>
                    <div id="recipie-time" className="form-row">
                        <label htmlFor="prep-time">Prep Time</label>
                        <input
                            type="text"
                            value={this.state.prepTime.value}
                            required
                            arai-label="Prep Time"
                            onChange={e => this.updatePrepTime(e.target.value)}
                        />
                        <label htmlFor="cook-time">Cook Time</label>
                        <input
                            type="text"
                            value={this.state.cookTime.value}
                            required
                            arai-label="Cook Time"
                            onChange={e => this.updateCookTime(e.target.value)}
                        />
                    </div>
                    <div id="ingredients-list" className="form-row">
                        <label htmlFor="ingredients">Ingredients</label>
                        {this.state.ingredients.map((ingredient, index) => (
                            
                            <div className="ingredients" key={ingredient + index}>
                                <input
                                    type="text"
                                    placeholder={`ingredient #${index + 1} name`}
                                    value={ingredient.ingredient}
                                    required
                                    onChange={this.handleIngredientNameChange(index)}
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
                            
                            <div className="instructions" key={instruction + index}>
                                <input
                                    type="text"
                                    placeholder={`instruction #${index + 1} name`}
                                    value={instruction.instruction}
                                    required
                                    onChange={this.handleinstructionNameChange(index)}
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
                            onChange={e => this.updateDishPic(e.target.value, e.target.files)}
                        />
                        <div className="current-picture">
                            Current Picture: <img src={`${config.API_ENDPOINT}/recipes/images/${matchingRecipe}`} />
                        </div>
                    </div>
                    <button
                        type="submit"
                    >
                        Edit Recipe
                    </button>
                    {this.state.error && <ValidationError message={this.state.error} />}
                </form>
            </div>
        )
    }
}