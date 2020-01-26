import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import dummydata from './dummydata';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <App users={dummydata.users} recipes={dummydata.recipes} />
  </BrowserRouter>, 
  div
  );
  ReactDOM.unmountComponentAtNode(div);
});
