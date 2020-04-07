import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import './index.css';

const container = document.createElement('div');
container.id = 'GC_Chat';
document.body.appendChild(container);

ReactDOM.render(
  <App />,
  document.getElementById('GC_Chat')
);
