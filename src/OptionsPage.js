import React, { Component } from 'react';
import { createClient } from 'contentful';
import FontAwesome from 'react-fontawesome';

class OptionsPage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.match.params);

    // // Set Initial State
    this.state = {
      Option: '',
      testId: this.props.match.params.testId,
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
    console.log(testType);
    if (testType === 'practice') {
      
    } else {

    }
  }

  render() {
    var buttonStyle = {
      margin: '10px'
    }

    return (
      <div className="OptionsPage">
        <h1>About the test</h1>
        <p>{this.state.helpText}</p>

        <h2>Ready to take the test?</h2>
          <button style={buttonStyle}
            onClick={() => this.handleClick('practice')}>
            Practice
          <FontAwesome name='arrow-circle-o-right' />
          </button>

          <button style={buttonStyle}
            onClick={() => this.handleClick('test')}>
            Start Test
          <FontAwesome name='arrow-circle-o-right' />
          </button>

      </div>
    );
  }
}

export default OptionsPage;
