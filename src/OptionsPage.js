import React, { Component } from 'react';
import { createClient } from 'contentful';
import FontAwesome from 'react-fontawesome';
import './OptionsPage.css';

class OptionsPage extends Component {
  constructor(props) {
    super(props);

    // // Set Initial State
    this.state = {
      Option: '',
      testId: this.props.match.params.testId,
      testName: this.props.match.params.testName,
      helpText: ''
    }

    // Bind functions
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // TODO: DRY - repeated code.
    var client = createClient({
      space: '4xbeshmjlgqs',
      accessToken: '3bfead8c496ebd173c5b896acee22b2a9011df359db822a91d34dffd90abea07'
    });

    client.getEntry(this.state.testId, {include: 5 })
    .then((response) => {
      this.setState({helpText: response.fields.helpText});
      return;
    })
  }

  handleClick(testType) {
    this.props.history.push(`/test/${this.state.testName}/${testType}/${this.state.testId}`)
  }

  render() {

    return (
      <div className="OptionsPage">
        <h1>About the test</h1>
        <p>{this.state.helpText}</p>

        <h2>Ready to take the test?</h2>
          <button
            onClick={() => this.handleClick('practice')}>
          <p>Practice</p>
          <FontAwesome name='arrow-right' />
          </button>

          <button
            onClick={() => this.handleClick('real')}>
          <p>Take Test</p>
          <FontAwesome name='arrow-right' />
          </button>

      </div>
    );
  }
}

export default OptionsPage;
