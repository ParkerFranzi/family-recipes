import React, { Component } from 'react'
import RandomRecipe from './RandomRecipe'

export default class Intro extends Component {
    render() {
        return (
            <section className="intro">
                <div className="intro-text">
                    <h2 className="section-title">Featured Recipes</h2>
                    <RandomRecipe />
                </div>               
            </section>
        )
    }
}