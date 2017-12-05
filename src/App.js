import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import Form from './Form.js';

class App extends Component {
  render() {
    return (
      <div>
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to HRx Bias Test</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and ssftftstave to reload.
        </p>
        <Form />
        <Footer />
      </div>
    )
  }
}

export default App;
