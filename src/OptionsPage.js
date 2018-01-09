import React, { Component } from 'react';
import { createClient } from 'contentful';
import FontAwesome from 'react-fontawesome';
import './App.css';

class OptionsPage extends Component {
  constructor(props) {
    super(props);

    // // Set Initial State
    this.state = {
      Option: '',
      testId: this.props.match.params.testId,
      testName: this.props.match.params.testName,
      helpText: '',
      isLoading: false,
    }

    // Bind functions
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // TODO: DRY - repeated code.
    var client = createClient({
      space: '4xbeshmjlgqs',
      accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
    });

    client.getEntry(this.state.testId, { include: 5 })
      .then((response) => {
        this.setState({
          helpText: response.fields.helpText,
          isLoading: false
        });
        return;
      })
  }

  handleClick(testType) {
    this.props.history.push(`/test/${this.state.testName}/${testType}/${this.state.testId}`)
  }

  render() {


    // Loader...
    if (this.state.isLoading) {
      return (
        <div className="loading-spinner"></div>
      )
    }

    // Function to uppercase test name
    function ucwords(input) {
      var words = input.split(/(\s|-)+/),
        output = [];

      for (var i = 0, len = words.length; i < len; i += 1) {
        output.push(words[i][0].toUpperCase() +
          words[i].toLowerCase().substr(1));
      }
      return output.join('');
    }

    return (
      <div className="OptionsPage">
        <h1>About the {ucwords(this.state.testName)} Bias Test</h1>
        <p>{this.state.helpText}</p>

        <h2>Ready to take the test?</h2>
        <div
          className='button'
          onClick={() => this.handleClick('practice')}>
          Practice
          <FontAwesome className="arrow-right" name='arrow-right' />
        </div>

        <div
          className='button'
          onClick={() => this.handleClick('real')}>
          Take Test
          <FontAwesome className="arrow-right" name='arrow-right' />
        </div>

      </div>
    );
  }
}

export default OptionsPage;
