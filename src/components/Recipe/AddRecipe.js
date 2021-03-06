import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import AuthApiService from '../../services/auth-api-service'
import ValidationError from '../../ValidationError'
import { Roller } from 'react-awesome-spinners'
import TokenService from '../../services/token-service'
import './AddRecipe.css'


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
            servings: {
                value: '',
                touched: false
            },
            cookTime: {
                value: '',
                touched: false
            },
            loading: false,
            error: null,
            admin: false,
            id: ''
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
    updateServings(servings) {
        this.setState({servings: {value: servings, touched: true }})
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
        this.setState({loading: true})
        const { dishName, description, ingredients, instructions, dishPic, prepTime, cookTime, servings, recipeCreator } = this.state

        const ingredientList = this.formIngredientList(ingredients)
        const instructionList = this.formInstructionList(instructions)
        console.log(ingredientList)

        let formData = new FormData()
        formData.append('dishname', dishName.value)
        formData.append('userid', recipeCreator.value)
        formData.append('description', description.value)
        formData.append('preptime', prepTime.value)
        formData.append('cooktime', cookTime.value)
        formData.append('servings', servings.value)
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
            servings.value = ''
            recipeCreator.value = ''
            recipe.ingredients = ingredientList
            recipe.instructions = instructionList
            console.log(recipe)
            this.context.addRecipe(recipe)
            this.setState({ loading: false })
            this.props.history.push(`/recipes/${recipe.id}`)
        })
        .catch(res => {
            this.setState({ loading: false })
            this.setState({ error: res.error })
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
        const currentUser = this.context.users.filter(user => user.id === this.state.id)
        return (
            <section className="add-recipe-form">
                <h1>Add Recipe</h1>
                <form onSubmit={this.handleSubmit}>
                    <div id="dish-name" className="form-row">
                        <label htmlFor="dish-name">Dish Name <span className="require-input">*</span></label>
                        <input
                            name="dishName"
                            type="text"
                            required
                            id="dishName"
                            onChange={e => this.updateDishName(e.target.value)}
                        />
                    </div>
                    <div id="recipe-creator" className="form-row">
                        <label htmlFor="recipe-creator">Recipe Creator <span className="require-input">*</span></label>
                        {this.state.admin && 
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
                        }
                        {!this.state.admin &&
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
                            {currentUser.map(user =>
                                <option key={user.id} value={user.id}>{user.fname + " " + user.lname}</option>    
                            )}
                        </select>
                        }
                    </div>
                    <div id="recipe-description" className="form-row">
                        <label htmlFor="description">Recipe Description <span className="require-input">*</span></label>
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
                    <div id="prep-time" className="form-row">
                        <label htmlFor="prep-time">Prep Time <span className="require-input">*</span></label>
                        <input
                            type="text"
                            name="prepTime"
                            id="prepTime"
                            required
                            aria-required="true"
                            aria-label="Prep Time"
                            onChange={e => this.updatePrepTime(e.target.value)}
                        />
                    </div>
                    <div id="cook-time" className="form-row">
                        <label htmlFor="cook-time">Cook Time <span className="require-input">*</span></label>
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
                    <div id="servings" className="form-row">
                        <label htmlFor="servings">Servings <span className="require-input">*</span></label>
                        <input
                            type="text"
                            name="servings"
                            id="serving-amount"
                            required
                            aria-required="true"
                            aria-label="Servings"
                            onChange={e => this.updateServings(e.target.value)}
                        />
                    </div>
                    <div id="ingredients-list" className="form-row">
                        <label htmlFor="ingredients">Ingredients <span className="require-input">*</span></label>
                        {this.state.ingredients.map((ingredient, index) => (
                            
                            <div className="ingredients" key={index}>
                                <input
                                    type="text"
                                    placeholder={`Ingredient #${index + 1}`}
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
                        <label htmlFor="instructions">Directions <span className="require-input">*</span></label>
                        {this.state.instructions.map((instruction, index) => (
                            
                            <div className="instructions" key={index}>
                                <textarea
                                    type="text"
                                    placeholder={`instruction #${index + 1}`}
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
                        <label htmlFor="dish-picture">Recipe Picture <span className="require-input">*</span></label>
                        <input
                            type="file"
                            id="dish-picture"
                            name="dish-picture"
                            accept=".jpg, .jpeg, .png"
                            required
                            onChange={e => this.updateDishPic(e.target.value, e.target.files)}
                        />
                    </div>
                    <div id="submit-button" className="form-row">
                        <button
                            type="submit"
                        >
                            Submit Recipe
                        </button>
                    </div>
                    {this.state.loading && <Roller />}
                    {this.state.error && <ValidationError message={this.state.error} />}
                </form>
            </section>
        )
    }
}