import React, { Component } from 'react';
import './App.css';
import { createClient } from 'contentful';
import FontAwesome from 'react-fontawesome';
import './Intro.css';

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
      testData: []
    }
    this.onClickTest = this.onClickTest.bind(this);
  }

  componentWillMount() {
    // var testNames = this.state.testNames;
    client.getEntries({
      content_type: 'biasTest'
    })
      .then((response) => {
        this.setState({ testData: response.items });
      });

      client.getEntries({
        content_type: 'biasTestIntro'
      })
      .then((response) => {
        this.setState({
          introTitle:response.items[0].fields.title,
          introText: response.items[0].fields.introText,

        });
        return;
      });

  }

  onClickTest(testItem) {
    let testName = testItem.fields.testTitle
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    this.props.history.push(`/test/${testName}/start/${testItem.sys.id}`);
  }

  render() {

    var testData = this.state.testData;

    return (
      <div className="Intro">
        <h1 className="Intro-title">{this.state.introTitle}</h1>
        <p className="Intro-text">{this.state.introText}</p>

        <h2>Choose a test: </h2>

        {testData.map((testItem) => {
          return (
            <div key={testItem.sys.id} className="button">
            <li onClick={() => this.onClickTest(testItem)}>{testItem.fields.testTitle} <FontAwesome className="arrow-right" name='arrow-right' /> </li>
            </div>
          )
        })
        }

      </div>
    );
  }
}

export default Intro;
