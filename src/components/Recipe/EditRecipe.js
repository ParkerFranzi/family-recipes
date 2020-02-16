import React, { Component } from 'react'
import FamilyContext from '../../FamilyContext'
import AuthApiService from '../../services/auth-api-service'
import ValidationError from '../../ValidationError'
import config from '../../config'
import TokenService from '../../services/token-service'
import { Roller } from 'react-awesome-spinners'

export default class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishName: {
                value: ''
            },
            description: {
                value: ''
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
            public_id: {
                value: ''
            },
            recipeCreator: {
                value: ''
            },
            prepTime: {
                value: ''
            },
            cookTime: {
                value: ''
            },
            loading: false,
            deleteCheck: false,

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
    setDishPic(name, dishPic) {
        this.setState({dishPic: {value: name, file: dishPic }})
    }
    setPublicId(public_id) {
        this.setState({ public_id: { value: public_id }})
        console.log(public_id)
    }
    setIngredients(ingredient) {
        this.setState({ 
            ingredients: [{ ingredient: ingredient.ingredientList[0] }]
        })
        for (let i=1; i<ingredient.ingredientList.length; i++) {
            this.setState({
                ingredients: this.state.ingredients.concat([{ ingredient: ingredient.ingredientList[i] }])
            })
            console.log(this.state)
        }
    }
    setInstructions(instruction) {
        this.setState({ 
            instructions: [{ instruction: instruction.instructionList[0] }]
        })
        for (let i=1; i<instruction.instructionList.length; i++) {
            this.setState({
                instructions: this.state.instructions.concat([{ instruction: instruction.instructionList[i] }])
            })
            console.log(this.state)
        }
        
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
        this.setState({ loading: true })
        const { dishName, description, ingredients, instructions, dishPic, prepTime, cookTime, public_id, recipeCreator } = this.state
        console.log(public_id)
        const ingredientList = this.formIngredientList(ingredients)
        const instructionList = this.formInstructionList(instructions)
        const recipeId = this.props.match.params.recipeId

        let formData = new FormData()
        formData.append('dishname', dishName.value)
        formData.append('userid', recipeCreator.value)
        formData.append('description', description.value)
        formData.append('preptime', prepTime.value)
        formData.append('cooktime', cookTime.value)
        formData.append('image', dishPic.file)
        formData.append('public_id', public_id.value)
        formData.append('ingredients', JSON.stringify(ingredientList))
        formData.append('instructions', JSON.stringify(instructionList))
        formData.append('current_user', TokenService.getUserId())

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
            public_id.value = ''
            recipe.ingredients = ingredientList
            recipe.instructions = instructionList
            this.setState({ loading: false })
            this.context.updateRecipe(recipe)
            console.log("help")
            this.props.history.push(`/recipes/${recipe.id}`)
            console.log("test")
        })
        .catch(res => {
            this.setState({ loading: false })
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
    handleDeleteCheck = () => {
        this.setState({
            deleteCheck: true
        })
    }
    handleDeleteRecipe = event  => {
        event.preventDefault()
        AuthApiService.deleteRecipe(this.props.match.params.recipeId)
        .then(() => {
            this.context.deleteRecipe(this.props.match.params.recipeId)
            this.props.history.push(`/`)
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }
    componentDidMount() {
        this.setState({loading: true})
        fetch(`${config.API_ENDPOINT}/recipes/edit-recipe/${this.props.match.params.recipeId}`, {
            headers: {
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
        .then(recipe => {
            this.updateDishName(recipe[0].dishname)
            this.setDishPic(recipe[0].pic_name, recipe[0].image)
            this.updateDescription(recipe[0].description)
            this.updateCookTime(recipe[0].cooktime)
            this.updatePrepTime(recipe[0].preptime)
            this.setIngredients(recipe[0].ingredients)
            this.setInstructions(recipe[0].instructions)
            this.updateRecipeCreator(recipe[0].userid)
            console.log(recipe[0])
            this.setPublicId(recipe[0].public_id)
            this.setState({ loading: false })
        })
        .catch(res => {
            this.setState({ loading: false })
            this.setState({ error: res.error })
        })
    }
    static contextType = FamilyContext
    render() {
        if (!this.context.recipes.length) {
            return <ul></ul>
        }
        const role = TokenService.getUserRole()
        const id = TokenService.getUserId()
        console.log(this.state, role, id)
        const matchingRecipe = Number(this.props.match.params.recipeId)
        const recipeFilter = this.context.recipes.filter(recipe => recipe.id === matchingRecipe)
        if (recipeFilter[0] === undefined) {
            return <div className="edit-recipe-form">
                <p>Recipe not found</p>
            </div>
        }
        return (
            <div className="edit-recipe-form">
                <form onSubmit={this.handleSubmit}>
                    <div id="dish-name" className="form-row">
                        <label htmlFor="dish-name">Dish Name</label>
                        <input
                            name="dish-name"
                            type="text"
                            required
                            value={this.state.dishName.value}
                            id="dish-name"
                            onChange={e => this.updateDishName(e.target.value)}
                        />
                    </div>
                    {role === 3 && 
                    <div id="recipe-creator" className="form-row">
                        <label htmlFor="recipe-creator">Recipe Creator</label>
                        <select
                            type="text"
                            value={this.state.recipeCreator.value}
                            required
                            aria-label="Recipe Creator"
                            onChange={e => this.updateRecipeCreator(e.target.value)}
                        >
                            <option key="default" value="default" disabled>Select the recipe creator</option>
                            {this.context.users.map(user =>
                                <option key={user.id} value={user.id}>{user.fname + " " + user.lname}</option>    
                            )}
                        </select>

                    </div>}

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
                            Current Picture: <img src={`${recipeFilter[0].image}`} />
                        </div>
                    </div>
                    <button
                        type="submit"
                    >
                        Edit Recipe
                    </button>
                    {this.state.loading && <Roller />}
                    {this.state.error && <ValidationError message={this.state.error} />}
                </form>
                <div id="delete-recipe">
                    {!this.state.deleteCheck && <button onClick={this.handleDeleteCheck}>Delete Recipe</button>}
                    {this.state.deleteCheck && 
                        <div className="delete">
                            Are you sure you want to delete recipe?
                            <button 
                                type="button"
                                className="deleteButton"
                                onClick={this.handleDeleteRecipe}
                            >
                                Delete
                            </button>
                        </div>
                    }
                </div>

            </div>
        )
    }
}