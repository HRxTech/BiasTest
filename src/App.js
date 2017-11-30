import React, { Component } from 'react';
import Intro from './Intro.js';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Intro/>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to HRx Bias Test</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and ssftftstave to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
