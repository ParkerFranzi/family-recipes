import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import dummydata from './dummydata';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
    <BrowserRouter>
        <App users={dummydata.users} recipes={dummydata.recipes}/>
    </BrowserRouter>,
    document.getElementById('root')
)