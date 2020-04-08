import React from 'react';
import ReactDOM from 'react-dom';
import EditUser from './EditUser';
import { MemoryRouter, Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const match = {
      params: {
          userId: 1
      }
  }
  ReactDOM.render(
  <MemoryRouter>
    <EditUser match={match} />
  </MemoryRouter>, 
  div
  );
  ReactDOM.unmountComponentAtNode(div);
});