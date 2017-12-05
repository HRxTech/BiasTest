import React, { Component } from 'react';
import './App.css';

var contentful = require('contentful');

var client = contentful.createClient({
  space: '4xbeshmjlgqs',
  accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
});

class Intro extends Component {

  componentWillMount(){

    client.getEntries()
    .then(function (entries) {
      // log the title for all the entries that have it
      entries.items.forEach(function (entry) {
        if(entry.fields.biasTest) {
          console.log(entry.fields.biasTest)
        }
      })
    })
  }

  render() {
    return (
      <div className="Intro">
        <h1 className="Intro-title">Welcome to HRx Bias Test</h1>
        <p className="Intro-text">
        Scalable silo equal opportunity progress entrepreneur human-centered collaborative consumption initiative. 
        The initiative changemaker impact NGO invest inclusion. NGO impact, leverage when society; movements society thought partnership. 
        Issue outcomes theory of change think tank natural resources venture philanthropy her body her rights. Paradigm living a fully ethical 
        life NGO sustainable then thought partnership. Mobilize disrupt save the world; indicators, catalyze, empower communities big data B-corp. 
        Relief, social return on investment theory of change expose the truth best practices or rubric our work. 
        </p>
      </div>
    );
  }
}

export default Intro;
