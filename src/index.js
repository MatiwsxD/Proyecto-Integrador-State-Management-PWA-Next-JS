import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//window.$dir="http://localhost:8080/"
window.$token="";
window.$expiration="";
window.$tasks="https://taskplannertasks.herokuapp.com";
window.$users="https://taskplannerusers.herokuapp.com";
ReactDOM.render(
    <App />,
  document.getElementById('root')
);