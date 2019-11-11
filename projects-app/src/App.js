import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import HomePage from './components/HomePage';
import SingleProject from './components/SingleProject';

function App() {  
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={HomePage}/>
        <Route path='/:id' component={SingleProject}/>
      </div>
    </Router>
    
  );
}

export default App;
