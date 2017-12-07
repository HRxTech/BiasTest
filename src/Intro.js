import React, { Component } from 'react';
import './App.css';
import { createClient } from 'contentful';
import { Link } from 'react-router-dom';


// TODO: DRY - repeated code.
var client = createClient({
  space: '4xbeshmjlgqs',
  accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
});

class Intro extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        chosenTest: '',
        testItem: '',
        testData: []
    }
    this.onClickPass = this.onClickPass.bind(this);    
  }


  onClickPass(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/option',
      state: {
        id: this.state.testData,
        color: 'green'
      }
    })
  }

  componentWillMount() {
    var testNames = this.state.testNames;
    client.getEntries({
      content_type: 'biasTest'
      
    })
    .then((response) => {
      this.setState({ testData : response.items });
  
    });
  }

  render() {

    var testData = this.state.testData;

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

        <h2>Choose a test: </h2>

        {testData.map((testItem) => {
          return (
          <li key={testItem.fields.testTitle}>
          <Link to='/option' ><button onClick={this.onClickPass}>
          {testItem.fields.testTitle}</button></Link></li>
          )
        })  
        }

        <ul>
          <li><Link to='/'>Intro</Link></li>
          <li><Link to='/form'>Form</Link></li>
          <li><Link to='/practice'>Practice Block</Link></li>
          <li><Link to='/option'>Options Page</Link></li>
        </ul>
      </div>
    );
  }
}

export default Intro;
