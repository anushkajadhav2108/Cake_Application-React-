import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import TodoList from './Todolist';
import Callingapi from './Callingapi';


ReactDOM.render(
  
    <Callingapi/>
,
  document.getElementById("root"),
  ()=>console.log("rendered")
)