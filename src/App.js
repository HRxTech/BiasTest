import React, { Component } from 'react';
import Intro from './Intro.js';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import Form from './Form.js';

class App extends Component {
  render() {
    return (
     
      <div className="App">
        <Header />
       <Intro/>
        <Form />
        <Footer />
      </div>
    )
  }
}

export default App;
