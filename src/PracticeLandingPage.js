import React, { Component } from 'react';

class PracticeLandingPage extends Component {
    constructor(props){
        super(props);

    }

    handleClick(e){
        console.log(e.target.value);

    }

  render() {
    var FontAwesome = require('react-fontawesome');
    return (
      <div className="PracticeLandingPage">
        <h1>{this.props.currentBlockTitle} Test</h1>
        <p>This Test will analyse your {this.props.currentBlockTitle} bias. You will be asked to categorize words into categories by pressing the Left or Right arrow keys. the categories are shown below, familiarize yourself with them before you start.</p>
        
        <div>
        <button 
          onClick={this.handleClick}
          value='start'>Start
          <FontAwesome name='arrow-circle-o-right' />
        </button>
      </div>

      </div>
    );
  }
}

export default PracticeLandingPage;
